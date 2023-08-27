import view from "../utils/view.js";

export default function Item() {
    getStory();
    view.innerHTML = `<div>item</div>`
}

async function getStory() {
    const storyID = window.location.hash.split('?id=')[1];
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`);
    const data = await response.json();
    const commentsArr = await getComments(data);
    const story = await { ...data, comments: commentsArr };
    console.log(story);
}

async function getComments(data) {
    const commentsArr = Promise.all(data.kids.map(async commentID => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`);
        const comment = await response.json();
        return comment;
    }));
    return commentsArr;
}
