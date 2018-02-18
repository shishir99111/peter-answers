var model = {
    answer: "",
    answerToggle: false,
    petitionText: "Peter please answer the following question",
    invalidResponse: [
        "That's not how you petition to Peter.",
        "Invalid petition. Please try again.",
        "You're not asking correctly",
        "Why should I answer to that?",
        "Please try again tomorrow. Or never...",
        "I'm tired... Try again another time.",
        "Not now, I'm busy. Maybe later.",
        "Fix you petition please.",
    ]
}

var controller = {
    init: () => {
        view.init();
    },
    keyPress: (e) => {
        console.log(e.data);
        var petitionLength = view.getPetitionLength();

        if(e.data === '.') {
            model.answerToggle = !model.answerToggle;
            view.renderInput();
        } else if(model.answerToggle && e.inputType === "deleteContentBackward") {
            model.answer = model.answer.slice(0,-1);
        } else if(model.answerToggle) {
            model.answer += e.data;
            view.renderInput();
        }
        console.log("answer: ", model.answer);
    
    },

    getPetitionChar: () => {
        return model.petitionText[view.getPetitionLength()-1];
    },

    getAnswer: () => {
        if(model.answer) {
            return model.answer;
        } else {
            let randomNum = Math.floor(Math.random() * model.invalidResponse.length);
            return model.invalidResponse[randomNum];
        }
        
    }

}

var view = {
    init: () => {
        document.getElementById('answerButton').addEventListener('click', () => {
            view.renderAnswer();
        });
        document.getElementById('petition').addEventListener('input', () => {
            controller.keyPress(event);
        });

    },
    getInputText: () => {
        return document.getElementById('petition').value;
    },
    getPetitionLength: () => {
        return document.getElementById('petition').value.length;
    },

    renderInput: () => {
        document.getElementById('petition').value = document.getElementById('petition').value.slice(0, view.getPetitionLength() -1) + controller.getPetitionChar();
    },

    renderAnswer: () => {
        document.getElementById('answer').innerHTML = controller.getAnswer();
        
    }
}


controller.init();