import Story from "../components/story.js";
import view from "../utils/view.js";

export default async function Stories(path) {
    const stories = await getStories(path);
    const hasStories = stories.length > 0;

    // const storiesHTML = hasStories ? 
    //     stories.map(story => Story(story)) : ['No stories'];
    
    // view.innerHTML = storiesHTML.join('');

    view.innerHTML = hasStories ? 
        stories.map((story, i) => Story({ ...story, index: i + 1 })).join('') : 'No stories';
}

async function getStories(path) {
    switch(path) {
        case '/':
            path = '/v0/topstories.json?print=pretty';
            break;
        case '/new':
            path = '/v0/newstories.json?print=pretty';
            break;
        case '/best':
            path = '/v0/beststories.json?print=pretty';
            break;
        case '/ask':
            path = '/v0/askstories.json?print=pretty';
            break;
        case '/show':
            path = '/v0/showstories.json?print=pretty';
            break;
        case '/jobs':
            path = '/v0/jobstories.json?print=pretty';
            break;
        default:
            break;
    }
    
    const response = await fetch(`https://hacker-news.firebaseio.com${path}`);
    const storyIDs = await response.json().then(response => response.slice(0, 20))
    
    const stories = getStoryJSON(storyIDs)

    return stories;
}

function getStoryJSON(arr) {
    const stories = Promise.all(arr.map(async story => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`);
        const storyObj = await response.json();
        return storyObj;
    }));
    return stories;
}
