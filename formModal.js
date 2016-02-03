/**
 * Created by SGT_POWELL on 1/31/2016.
 */

(function(){
    var data ={};



    $('#form-modal').on('click', function(event){
        $('#formModal').modal('toggle');
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
            $.each($('#formModal').serializeArray(), function(i, field){
              inputs[field.name]= field.value;
            });


            //Show Collected Data
            console.log("Data: "+data.firstName +" "+ data.lastName +" "+ data.emailAddress );
            //alert(data.firstName + " " + lName + "\n" + eAddress);



            /*
                    VALIDATE USER INPUT FIELD DATA
            */
            validation(data) ? postContactToGoogle(data) : alert("Validation Error. All fields all required!");
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
    }


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
                    //Clean up for formData.lastName;
                    //Clean up for formData.emailAddress;
                    //Success message
                    console.log("status:0 Success!!")
                },
                200: function (){
                    //Clean up for formData.firstName;
                    //Clean up for formData.lastName;
                    //Clean up for formData.emailAddress;
                    //Success Message
                    console.log("status:200 Success!!")
                }
            }
        });
    }

})();
