
(function () {

    // html elements
    const untypedElement = document.getElementById('untyped');
    const typedElement = document.getElementById('typed');


    // model
    const quotes = [];
    // data for elements
    const currentQuote = { untyped: "", typed: "" };

    let typeCount = 0;
    let correctTypeCount = 0;

    document.addEventListener("keypress", solve);

    //controller 
    function solve(e) {

        typeCount++;

        //keyが正しい場合は
        if (e.key == currentQuote.untyped.charAt(0)) {

            correctTypeCount++;

            //最後の文字列だったら次の問題
            if (currentQuote.untyped.length == 1) {

                nextQuote();

            } else {

                nextCharacter();
            }

        }


    }


    // controller
    function nextQuote() {

        //問題がなければクリアと表示してリロード
        if (quotes.length == 0) {

            showScoreAndReload();

        } else {

            const quote = quotes.shift();
            currentQuote.typed = ""
            currentQuote.untyped = quote;

            renderQuote();
        }

    }

    // controller
    function nextCharacter() {

        currentQuote.typed = currentQuote.typed + currentQuote.untyped.substring(0, 1);
        currentQuote.untyped = currentQuote.untyped.substring(1, currentQuote.untyped.length);

        renderQuote();
    }

    // controller
    function showScoreAndReload() {

        const accuracyRate = Math.floor((correctTypeCount / typeCount) * 100);
        const template = 'Your percentage of correct answers is {{accuracyRate}}%';

        window.alert(template.replace("{{accuracyRate}}", accuracyRate));

        window.location.reload();
    }

    //model
    function loadQuotes(callback) {
        quotes.push("It means that your future hasn't been written yet.");
        quotes.push("No one's has.");
        quotes.push("Your future is whatever you make it.");
        quotes.push("So make it a good one.");
        quotes.push("Both of ya!");

        callback();
    }

    //view
    function renderQuote() {
        typedElement.innerHTML = currentQuote.typed;
        untypedElement.innerHTML = currentQuote.untyped;

    }

    loadQuotes(nextQuote);

}());












