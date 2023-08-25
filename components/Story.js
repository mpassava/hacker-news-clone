export default function Story(story) {
    
    const domain = story.url ? `(${story.url.replace('https://', '').split('/')[0]})` : '';
    console.log(story);

    return `
        <div class="story">
            <div>
                <span class="gray">${story.index}.</span>
                <span class="upvote">▲</span>
                <a href="${story.url}">${story.title}</a>
                <span>${domain}</span>
            </div>
            <div>
                <div class="gray">
                    ${story.score} points by ${story.by}
                    |
                    <a href="#/item?id=${story.id}">${story.id}</a>
                    |
                    <span class="favorite">
                        <img class="heart" src="https://icon.now.sh/heart/ccc">
                        Add To Favorites
                    </span>
                </div>
            </div>
        </div>
    `;
}
