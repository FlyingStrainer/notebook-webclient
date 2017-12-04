export function post(url, data, processFunc, errorFunc){
	fetch("http://endor-vm1.cs.purdue.edu/" + url, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}).then(function(response) {
		if(response.ok) {
			return response.json();
		}

		throw new Error(response);
	}).then(function(json) {
		if(processFunc)
			processFunc(json);
	}).catch(function(error) {
		if(errorFunc)
			errorFunc(error);
	})
}

export function get(url, data, processFunc, errorFunc){
    fetch("http://endor-vm1.cs.purdue.edu/" + url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        if(response.ok) {
            return response;
        }

        throw new Error(response);
    }).then(function(json) {
        if(processFunc)
            processFunc(json);
    }).catch(function(error) {
        if(errorFunc)
            errorFunc(error);
    })
}

export function showHide(currentState) {
	if(currentState === "stateLoad " || currentState === "stateHide ")
		return "stateShow ";
	return "stateHide ";
}
