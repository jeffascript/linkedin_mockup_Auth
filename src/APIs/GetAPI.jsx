
const GetAPI = async (userName, access_token, whatToFetch, userName2, ID) => {
    let URL = undefined

    switch (whatToFetch) {
        default:
            URL = "http://app-be.azurewebsites.net/profiles/"
            break
        case 'experience':
            URL = "http://app-be.azurewebsites.net/profiles/" + userName + "/experiences/".concat(ID)
            break
        case 'experiences':
            !userName2
            ?
            URL = `http://app-be.azurewebsites.net/profiles/profile/${userName}/experiences`
            :
            URL = `http://app-be.azurewebsites.net/profiles/profile/${userName2}/experiences`
            break
        case 'posts':
            URL = "http://app-be.azurewebsites.net/profiles/posts/"
            break
        case 'profile':
            !userName2
            ?
            URL = "http://app-be.azurewebsites.net/profiles/username/".concat(userName)
            :
            URL = "http://app-be.azurewebsites.net/profiles/".concat(userName2)
        break
        case 'post':
                URL = "http://app-be.azurewebsites.net/profiles/posts/" + ID
    }

    try {
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                // "Authorization": "Basic " + btoa(`${userName}:${token}`),
                "Authorization": "Bearer " + access_token
               
            }
        })
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.log(error);
    }
}

export default GetAPI