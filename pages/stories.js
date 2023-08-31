import Story from "../components/story.js";
import view from "../utils/view.js";
import baseUrl from "../utils/baseUrl.js";

export default async function Stories(path) {
    const stories = await getStories(path);
    const hasStories = stories.length > 0;

    view.innerHTML = hasStories ? 
        stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories';
}

async function getStories(path) {
    switch(path) {
        case '/':
            path = '/topstories.json?print=pretty';
            break;
        case '/new':
            path = '/newstories.json?print=pretty';
            break;
        case '/best':
            path = '/beststories.json?print=pretty';
            break;
        case '/ask':
            path = '/askstories.json?print=pretty';
            break;
        case '/show':
            path = '/showstories.json?print=pretty';
            break;
        case '/jobs':
            path = '/jobstories.json?print=pretty';
            break;
        default:
            break;
    }
    
    const response = await fetch(`${baseUrl}${path}`);
    const storyIDs = await response.json().then(response => response.slice(0, 20))
    
    const stories = await getStoryJSON(storyIDs);

    return stories;
}

function getStoryJSON(arr) {
    const stories = Promise.all(arr.map(async story => {
        const response = await fetch(`${baseUrl}/item/${story}.json?print=pretty`);
        const storyObj = await response.json();
        return storyObj;
    }));
    return stories;
}
