interface Action {
    type: string;
    payload?: any;
}

interface Data {
    rejected: {
        match: (action: Action) => boolean;
    };
}

export function ErrorHandling(action: Action, data: Data): boolean {
    if (data.rejected.match(action)) {
        alert(action.payload.message);
        return true;
    } 
    else {
        alert(action.payload.message);
        return false;
    }
}