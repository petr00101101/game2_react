export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
    const { id, optionOne, optionTwo } = question;
    const { name, avatarURL } = author;
    var voted = optionOne.votes.indexOf( authedUser ) !== -1 || optionTwo.votes.indexOf( authedUser ) !== -1;
    var chosenVote = voted ? (optionOne.votes.indexOf( authedUser ) !== -1 ? "optionOne" : "optionTwo" ) : null;

    return {
        id,
        name,
        voted,
        chosenVote,
        optionOneVotes: optionOne.votes.length,
        optionOneText: optionOne.text,
        optionTwoVotes: optionTwo.votes.length,
        optionTwoText: optionTwo.text,
        totalVotes: optionOne.votes.length + optionTwo.votes.length,
        avatar: avatarURL,
    }

}
