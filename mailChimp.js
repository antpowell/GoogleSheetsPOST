/**
 * Created by SGT_POWELL on 3/23/2016.
 */
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