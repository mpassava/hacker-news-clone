export default function Comment(comment) {
    console.log(comment);
    return `
        <div class="nested-comments-0">
            <p class="comment-header">
                ${comment.by} | ${comment.id}
            </p>
            ${comment.text}
        </div>
    `
}


// I&#x27;ve been sort-of adjacent to a lot of these groups when they were in their infancy (hackr.org darkdevelopments.com ssgroup.org etc;) and it&#x27;s really cool how the majority of the kids who were running those sites in the 2000&#x27;s are now so keen to create <i>better</i> environments for others to learn.<p>Hackthissite is another excellent resource from the same pedigree of people