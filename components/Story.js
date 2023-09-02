export default function Story(story) {
    const domain = story.url ? `(${story.url.split('/')[2]})` : '';
    
    return `
        <div class="story">
            <div>
                <span class="gray">${story.index ? (`${story.index}.`) : ''}</span>
                <span class="upvote">▲</span>
                <a href="${story.url}">${story.title}</a>
                <span>${domain}</span>
            </div>
            <div>
                <div class="gray">
                    ${story.score} points by ${story.by}
                    |
                    <a href="#/item?id=${story.id}">
                        ${story.descendants} comments
                    </a>
                    |
                    <span class="favorite" data-story='${JSON.stringify(story)}'>
                        <img class="heart" src="../img/heart.png">
                        ${story.isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
                    </span>
                </div>
            </div>
        </div>
    `;
}
