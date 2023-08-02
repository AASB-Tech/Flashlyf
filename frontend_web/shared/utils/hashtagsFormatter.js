// Formats a raw hashtags input string to an array of hashtags
/*
    Hashtag requirements:
    - Minimum of 1 hashtag.
    - Maximum of 3 hashtags.
    - Minimum of 3 characters.
    - Maximum of 50 characters.
    - Alphabetical characters only.
    - No special characters. 
    - No duplicate hashtags.
*/
export default function hashtagFormatter(hashtagsRaw, limit) {
    // Only lower case alphabet character hashtags allowed
    let hashtagsModified = hashtagsRaw
        .toLowerCase()
        .trim()
        .replace(/[^a-z ]/g, "");
    // Each hashtag is seperated by a space. 
    // .filter removes empty hashtags created by double spaces. 
    // Only counts words above 3 characters as hashtags
    let hashtagsArray = hashtagsModified.split(" ").filter((hashtag) => hashtag.trim() != "" && hashtag.length >= 3);
    // remove duplicate hashtags
    hashtagsArray = [...new Set(hashtagsArray)];
    //Limit the hashtags to only the specificed limit
    if (hashtagsArray.length > limit) {
        hashtagsArray.splice(limit);
    }
    //Limit each hashtag to only 50 characters
    hashtagsArray.forEach((hashtag) => {
        if (hashtag.length > 50) {
            hashtag.splice(50);
        }
    });

    // Use
    // hashtagsNormalizedString = hashtagsArray.join(" ");
    // To create a string of normalized hashtags seperated by spaces
    // or 
    // const hashtagsString = "#" + hashtagsArray.join(" #");
    // To create a string of hashtags seperated by spaces with a hashtag symbol in front of each hashtag
    return hashtagsArray;
}
