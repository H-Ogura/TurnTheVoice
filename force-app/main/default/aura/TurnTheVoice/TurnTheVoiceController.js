({
    handleSpeechText: function(component, event, helper) {
		window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		  
        if ('SpeechRecognition' in window) {
            // console.log('supported speech')
        } else {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Sorry...",
                "message": "この端末ではこの機能は使えません。"
            });
            toastEvent.fire();
        }

        recognition = new window.SpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.continuous = true;
        recognition.interimResults = true;
        let finalTranscript = ''; // 確定した認識結果
        const resultDiv = document.querySelector('#result-div');
        recognition.onresult = (event) => {
            let interimTranscript = ''; // 暫定の認識結果
            for (let i = event.resultIndex; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + '。<br>';
                    final = transcript;
                    component.set("v.value", finalTranscript);
                    resultDiv.innerHTML = '';
                } else {
                    interimTranscript = transcript;
                }
            }
            // resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
            resultDiv.innerHTML = '<i>' + interimTranscript + '</i>';
        }
          
        recognition.onstart = function() {
            component.set("v.IsTurning", true);
        }

        recognition.onend = function() {
            component.set("v.IsTurning", false);
        }

		recognition.start();
    },
    handleSpeechStop: function(component, event, helper) {
        recognition.stop();
    }, 
    handleAddText: function(component, event, helper) {
        document.querySelector('#result-div').innerHTML = '';
        component.set("v.value", "");
    },
    handleSaveContent: function(component, event, helper) {
        var action = component.get('c.createContentNote');
        action.setParams({ title : component.get("v.title"), content: component.get("v.value") });
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "保存しました！",
                "type": "success"
            });
            toastEvent.fire();
            handleAddText();
        });
        $A.enqueueAction(action);
    }
})
