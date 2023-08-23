import view from "../utils/view.js";

export default async function Stories(path) {
    const stories = await getStories(path);
    const hasStories = stories.length > 0;

    const storiesHTML = hasStories ? 
        stories.map(story => `<div>${story}</div>`) : ['No stories'];
    
    view.innerHTML = storiesHTML.join('');

    // view.innerHTML = `<div>
    //     ${hasStories ? stories.map(story => JSON.stringify(story)) : 'No stories'}
    // </div>`;
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
    // const isHomeRoute = path === '/';
    // if (isHomeRoute) path = '/v0/topstories.json?print=pretty';

    const response = await fetch(`https://hacker-news.firebaseio.com${path}`);
    let stories = await response.json()
    stories = stories.slice(0, 1);

    console.log(getStoryJSON(stories));
    // return stories;
}

async function getStoryJSON(arr) {
    const getObject = async story => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`);
        const storyObj = await response.json();
        console.log(storyObj)
        // return storyObj;
    }

    const storiesMasterList = arr.map(story => getObject(story));
    return storiesMasterList;
}