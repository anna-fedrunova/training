;(function(){

    Module.createHandler(window, 'load', init, false);
    function init() {
        for (var i = 0; i < document.forms.length; i++) {
            var form = document.forms[i];

            var formValidation = false;

            var total = 0;

            var radio = [];

            var checkbox = [];
            var size = false;
            var ingr = 0;
            var prevSize=0;

            for (var j = 0; j < form.elements.length; j++) {
                var e = form.elements[j];

                if (e.type == 'text') {

                    // проверка имеются ли атрибуты требующие проверки.
                    var pattern = e.getAttribute('data-val');

                    if (pattern) {
                        Module.createHandler(e, 'change', validateInput, false) // обработчик на изменение.
                        formValidation = true; // форма требует проверку.
                    }
                }
                //Create arrays of radio buttons and checkboxes

                else if (e.type == 'radio') {
                    radio.push(e);
                    Module.createHandler(e, 'click', validateRadio, false);
                    formValidation = true;
                } else if (e.type == 'checkbox') {
                    checkbox.push(e);
                    Module.createHandler(e, 'click', validateCheckbox, false);
                    formValidation = true;
                }
            }
            if (formValidation) {
                Module.createHandler(form, 'submit', validateForm, false); // установка обработчика для формы на submit
            }
        }

        function validateRadio(event) {
            size = true;

            for (i=0; i<radio.length; i++){
                if (radio[i].checked) {
                    total=total + parseInt(this.dataset.val) - prevSize;
                }
            }
            prevSize = parseInt(this.dataset.val);
            document.getElementById("sizeMsg").innerHTML = "";
            //Show the total
            if (total !== 0) {
                document.getElementById('total').innerHTML = "Total: "+total+" UAH";
            }
        }

        function validateCheckbox(event) {
            if (event.target.checked) {
                total=total+parseInt(this.dataset.val);
                ingr+=1;
            }
            else {
                total=total-parseInt(this.dataset.val);
                ingr-=1;
            }
            document.getElementById("ingrMsg").innerHTML = "";
            //Show the total
            if (total !== 0) {
                document.getElementById('total').innerHTML = 'Total: ' + total + " UAH";
            }
        }

        function validateInput() {
            var pattern = this.dataset.val;
            var msg = this.dataset.valMsg;
            var id = this.dataset.valMsgId;
            var value = this.value;
            var res = value.search(pattern);

            if (res === -1 && id) {
                document.getElementById(id).innerHTML = msg;
                if (this.className == 'short') {
                    this.className = 'shortinvalid';
                } else this.className = "invalid";
            } else if (id) {
                document.getElementById(id).innerHTML = "";
                if (this.className == 'short' || this.className == 'shortinvalid') {
                    this.className = 'shortvalid';
                } else this.className = "valid";
            }
        }

        function validateForm(event) {
            var invalid = false;


            //Check if all required text-fields are filled out

            for (i = 0; i < this.elements.length; i++) {
                var e = this.elements[i];
                if (e.type == 'text' && e.dataset.val) {

                    if (e.value == '') {
                        if (e.className == 'short' || e.className == "shortinvalid") {
                            e.className = 'shortinvalid';
                        } else e.className = "invalid";
                    }
                    if (e.className == "invalid" || e.className == "shortinvalid") {
                        invalid = true;
                    }
                }

            }

            // Check if a radio button is checked
            if (size === false) {
                invalid = true;
                document.getElementById("sizeMsg").innerHTML = "You have forgotten to choose a size of your pizza!";
            }


            //Check if at least one checkbox is checked

            if (ingr === 0) {
                invalid = true;
                document.getElementById("ingrMsg").innerHTML = "You have forgotten to choose ingredients for your pizza!";
            }


            if (invalid) {
                alert("All required fields must be filled out!");
                return event.preventDefault();
            }
            else {
                alert ("Thank you for your order!")
            }
        }
    }


}) ();
