/**
 * Created by SGT_POWELL on 1/31/2016.
 */
/*
*this script will active the modal on the click of the cta
* gather the data entered by the user and store it in a google
* sheets spreadsheet.Then it will redirect to the href of the cta clicked.
*/

(function(){
    /*Create variables to capture the href address, the Data the user enters, and a timer that will give the page time to
    * send the captured data to the Google Form response sheet. Without timer user data seems not to post.*/
    var redirect;
    var data ={};
    var timedRedirect;

    /*Once CTA button is clicked stop href redirect and open modal*/
    $('#form-modal').on('click', function(event){
        //Stop Default href action
        event.preventDefault();
        //Store href for later
        redirect = $(this).attr('href');

    //---------->enable modal<-----------
        $('#formModal').modal('toggle');

        //Get data from modal form
        $('#saveData').on('click',function(){
            var fName = $.trim($('#firstName').val());
            var lName = $.trim($('#lastName').val());
            var eAddress = $.trim($('#email').val());
            var inputs = {};

            //Gather User Data
            data={
                formkey:"17zWfo4sS5_uKitrrwoLCda7fxwvYm9kHjFBBJmGmUhA",
                firstName:fName,
                lastName:lName,
                emailAddress:eAddress
            };
            //Clear form fields
            $.each($('#formModal').serializeArray(), function(i, field){
              inputs[field.name]= field.value;
            });


            //Show Collected Data
            console.log("Data: "+data.firstName +" "+ data.lastName +" "+ data.emailAddress );




            /*
                    VALIDATE USER INPUT FIELD DATA
            */
            validation(data) ?  postContactToGoogle(data) : alert("Validation Error. All fields all required!");

            //timedRedirect();
            clearTimeout(timedRedirect);
            //timed redirect to HPPCC. The timer should allow for the data time
            //to store in db.
            timedRedirect = setTimeout(function(){
                window.location.href = redirect;
            },500);



        });
    });
    var validation = function(fields){
        console.log("isValid: " + (fields.firstName && fields.lastName && isEmail(fields.emailAddress))? true : false);
        return (fields.firstName && fields.lastName && isEmail(fields.emailAddress))? true : false;
        //return !!(fields.firstName && fields.lastName && isEmail(fields.email));
    };



    function isEmail(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };


/*--------------------------------------------------------------------------------------------------------------------
        Sheets Hack THANKS to forum post: https://wiki.base22.com/pages/viewpage.action?pageId=72942000
 --------------------------------------------------------------------------------------------------------------------*/

    function postContactToGoogle(formData){
        $.ajax({
            url: "https://docs.google.com/forms/d/17zWfo4sS5_uKitrrwoLCda7fxwvYm9kHjFBBJmGmUhA/formResponse",
            data: {"entry.1490454186" : formData.firstName, "entry.794182634" : formData.lastName, "entry.1472414226": formData.emailAddress},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function (){

                    //Clean up for formData.firstName;
                    $('#firstName').val("");
                    //Clean up for formData.lastName;
                    $('#lastName').val("");
                    //Clean up for formData.emailAddress;
                    $('#email').val("");
                    //Success message
                    console.log("status:0 Success!!");
                    //close modal after success
                    $('#formModal').modal('toggle');
                    //window.location.href = $('#form-modal').attr('href');
                },
                200: function (){
                    //Clean up for formData.firstName;
                    $('#firstName').val("");
                    //Clean up for formData.lastName;
                    $('#lastName').val("");
                    //Clean up for formData.emailAddress;
                    $('#email').val("");
                    //Success message
                    console.log("status:200 Success!!");
                    //close modal after success
                    $('#formModal').modal('toggle');
                }
            }

        });


    };


})();
