	 var pictureSource;   // picture source
	 var db;
	 var g_socketid = -1;
	 var ecgMeasurement = 1;
	 var dataCnt = 0;
	 var getPlotVal='';
	 var dataValidECG = 0;
   	 var dtype='';
	 var headerVal=1;
	 var ecgFilePath = '';
	 var stethFilePath = '';
	 var newreg;
	 var parentDir;
	 var torchval;
	 var imageFilePath;
	 var renameComplete;
	 var moveComplete;
	 var parentComplete;
	 var imgFile;
	 var patientID;
 	 var patientMobile;
	 var btnclicked=1;
	 var ton=1;
	 var divi='';
	 var prediv = '';
	// var pwd='';
	 var currentpwd;
	// var npwd='';
	// var statpwd="admin"
	 var serusername;
	 var serpassword;
	 var newpassword;
	

	var url = "http://w3schools.com/webservices/tempconvert.asmx";
 /*
	 var newurl = "http://www.clinic2care.com/axis2/services/PatientsWs";
	 var patientRegUrl = "http://www.clinic2care.com/axis2/services/PatientsRegWs";
	 var getPatientUrl = "http://www.clinic2care.com/axis2/services/PatientRetrieveWs";

	 var newurl = "http://10.85.18.131/axis2/services/PatientsWs";
	 var patientRegUrl = "http://10.85.18.131/axis2/services/PatientsRegWs";
	 var getPatientUrl = "http://10.85.18.131/axis2/services/PatientRetrieveWs";
*/
	 var newurl = "";
	 var patientRegUrl = "";
	 var getPatientUrl = "";
	 window.addEventListener('load', function () {
	    document.addEventListener('deviceready', onDeviceReady, false);
	}, false);

	function onDeviceReady()
	{
       	db = window.openDatabase("EMRDB", "1.0", "Patient Database", 200000);
        db.transaction(initializeDB, errorCB, successCB);
	db.transaction(selectTB, errorCB, successTBS);
	db.transaction(selectserver, errorserver, successserver);

        window.plugins = {
       		BluetoothPlugin: cordova.require( 'cordova/plugin/bluetooth' )
        };
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
         enableBT();
	 pictureSource=navigator.camera.PictureSourceType;
         destinationType=navigator.camera.DestinationType;

        }

        function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI});
    }

     function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
       console.log(imageData);
       renameComplete = 0;
	    console.log("File Name: " + imageData);
		window.resolveLocalFileSystemURI(imageData, moveFile, failRename);

    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }

function moveFile(entry) {
moveComplete = 0;
parentComplete = 0;
	    imgFile = entry;
//		entry.getParent(getParentDir,getParentDirFail);
//	var todaysDate=new Date();
	//	var curr_date = todaysDate.getDate();
	//	var curr_month = todaysDate.getMonth();
     //  	var curr_year = todaysDate.getFullYear();
       //	var curr_hour = todaysDate.getHours();
    //   	var curr_min = todaysDate.getMinutes();
		var tempphid=$("#PtId").val();
		var ptid = tempphid + '.jpg';
	   // console.log("File Name: " + ptid);

    // move the file to a new directory and rename it
      imgFile.copyTo(parentDir, ptid, moveFilesuccess, moveFilefail);
    renameComplete = 1;

}
/*
    function moveFilesuccess(entry) {
     imageFilePath = entry.fullPath;
    //console.log("New Path: " + entry.fullPath);
    moveComplete = 1;
      var smallImage = document.getElementById('smallImage');

      smallImage.style.display = 'block';
      smallImage.alt = 'Cannot display image';

      	smallImage.src = imageFilePath;
      var tstImage = document.getElementById('Ptphoto');
      tstImage.value = imageFilePath;
	//    console.log("Renamed File Name: " + imageFilePath);
                       var options = new FileUploadOptions();
            options.fileKey="file1";
            options.fileName=imageFilePath.substr(imageFilePath.lastIndexOf('/')+1);
          //console.log("Renamed File Name: " + options.fileName);
            options.mimeType="image/jpeg";

          // var params = new Object();
           // params.pid = "1001";
            //params.value2 = "param";

         //   options.params = params;
            options.chunkedMode = false;
            console.log("File Upload..");

            var ft = new FileTransfer();
            ft.upload(imageFilePath, "http://clinic2care.com/upload.jsp", win, uploadfail, options);
}
*/


    function moveFilesuccess(entry) {
     imageFilePath = entry.fullPath;
    //console.log("New Path: " + entry.fullPath);
    moveComplete = 1;
      var smallImage = document.getElementById('smallImage');

      smallImage.style.display = 'block';
      smallImage.alt = 'Cannot display image';

      	smallImage.src = imageFilePath;

      var tstImage = document.getElementById('Ptphoto');
      tstImage.value = imageFilePath;
	//alert(imageFilePath);
	//    console.log("Renamed File Name: " + imageFilePath);
                       var options = new FileUploadOptions();
            options.fileKey="file1";
            options.fileName=imageFilePath.substr(imageFilePath.lastIndexOf('/')+1);
          //console.log("Renamed File Name: " + options.fileName);
            options.mimeType="image/jpeg";

          // var params = new Object();
           // params.pid = "1001";
            //params.value2 = "param";

         //   options.params = params;
            options.chunkedMode = false;
            console.log("File Upload..");


  $.ajax({
  type: "POST",
  url: "http://greenocean.in/demo/js/canvas/upload-image.php",
  data: {
     img: imageFilePath
  }
}).done(function(o) {
  console.log('saved');
alert("saved");
  //alert("Saved... TO /var/www/CI_CPCL-VL/php/uploads");

});



           // var ft = new FileTransfer();
            //ft.upload(imageFilePath, "http://clinic2care.com/upload.jsp", win, uploadfail, options);

}


 function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }
            function uploadfail(evt) {
        		console.log(evt);
    }

function moveFilefail(error) {
    alert("Move Err:" + error.code);
    moveComplete = 1;
}

function failRename(){
    console.log("Failed Rename");
    renameComplete = 1;
}

	 function onBackKeyDown(e)
	 {
		//alert("close");
if($.mobile.activePage.is('#mainpage')){
        e.preventDefault();
        navigator.app.exitApp();
    }

	 }
	function onmenuKeyDown()
	{
	//alert("menu...");
	}
	function insertredy()
	{
		db.transaction(insertTB, errorIST, successTB);
	}
	function selectval1()
	{
		db.transaction(selectTB, errorCB, successTBS);
		//alert("selected");
	}

	var devicetodelete='';

	function delval()
	{
		db.transaction(deleteAll, errorCB, successTBS);
	}
	function delvalSelected()
	{
		db.transaction(deleteTV, errorCB, successTBS);
	}
	$(function(){
		// $(".chk").click(function (){alert('clicked');});
		$(".del_ExpenseRow").live("click", function(){
		devicetodelete='';
		devicetodelete = $(this).parent().siblings(":first").text();
		var r=confirm("Delete a "+devicetodelete+" Bluetooth Device!");
		if (r==true)
		  {

		  //alert (devicetodelete);
		  $(this).closest('tr').remove();
		  delvalSelected();
		  }
		else{}


	});
		$("#regs1").addClass("ui-btn-active ui-state-persist");
		$("#Medidets1").removeClass("ui-btn-active ui-state-persist");
		$('#registernav').show();
		$('#Register').show();
		$('#MediDet').hide();
		$('#bluth').hide();
		$('#skyp').hide();
		$('#chat1').hide();


		$("#loginok").click(function (){
		//alert(serusername);
		//alert(serpassword);

			if(seruserid)
			{
				var lusername1 = $('#lusername').val();
				var lpassword1 = $('#lpassword').val();

				if((lusername1==serusername)&&(lpassword1==serpassword))
				{

					$('#dispcontent').show();
					$('#dispmenu').show();
					$('#displogin').hide();
					db.transaction(userin, errorid, successid);
				}
				else
				{
					alert("invalid login");
					$('#dispcontent').hide();
					$('#dispmenu').hide();
					$('#displogin').show();
					db.transaction(userout, errorid, successid);
				}
			}


		});

		$("#logincancel").click(function (){

			$('#lusername').val("");
			$('#lpassword').val("");
			$('#dispcontent').hide();
			$('#dispmenu').hide();
			$('#displogin').show();

		});

	$("#setpassword").click(function (){
	currentpwd = $('#curpwd').val();
	if((currentpwd!="")&&($('#newpwd').val()!=""))
	{

		if(serpassword == currentpwd)
		{
			 newpassword = $('#newpwd').val();
			//alert(newpassword);
			if($('#newpwd').val()!="")
			db.transaction(userdelete, errorpwd, successChange);
			else alert("Please Enter New Password");
		}
		else
		{
		}
		//alert("New password set");
	}
	else
	alert("please Enter Current Password And New Password...");
	});

	$("#selectval").click(function (){
	paring();
	 });
		//$("#delch").click(function (){delval();selectval1();});
	//$("#ptBUp").click(function(){  	NewReg(); });

$("#ptBUp").click(function(){  godb(); });

function godb()
	{

    $('#cmnpinner').show();
		if ($("#PtId").val() == 'Patient Id')
		{
		var data = new Array();
		data[0] = $("#Ptname").val();
		data[1] = $("#Ptmob").val();
		data[2] = $("#Ptdob").val();
		data[3] = $("#Ptgender").val();
		data[4] =$("#Ptadd").val();
		data[5] =$("#Ptalid").val();
		data[6] =$("#Ptage").val();



		/*if (checkConnection() == 'No network connection')
			{alert ('No network connection');
			$('#cmnpinner').hide();
			}
			else
			{*/
//alert(data);
				$.ajax({
				url 	: 'http://greenocean.in/n-rest/index.php/api/example/pragoreg',
				dataType: 'json',
			       	type    : 'POST',
				data	: {data:data},
				success : function (data){
				    $('#cmnpinner').hide();
						if (data.response =="true")
						alert (data.message);
						else
						alert(data.message);

						 NewReg_idgen();
						}
					});
			//}


		}
		else
		alert ("Already Registered");
	}

	function NewReg_idgen()
	{
	    //$('#cmnpinner').show();

			var data = new Array();
			data[0] = $("#Ptname").val();
			data[1] = $("#Ptmob").val();
			data[2] = $("#Ptdob").val();
			data[3] = $("#Ptgender").val();
			data[4] = $("#Ptadd").val();
			$.ajax({
			'dataType': 'json',
			'type'    : 'GET',
			'url'     : 'http://greenocean.in/n-rest/index.php/api/example/pragoreget1',
			'data'    : {data: data},
			'success' : function(data){
				if (data.response =='true')
				{
				   // $('#cmnpinner').hide();
					alert("Patient id is: "+data.emp_id);
					$("#PtId").val(data.emp_id);
					$("#uid").val(data.emp_id);
					$("#getdt").show();
					$("#captimg").show();

					}
			}
		});


	}

	$("#reg").click(function (){

		//$('#registernav').show();
		$("#regs1").addClass("ui-btn-active ui-state-persist");
		$("#Medidets1").removeClass("ui-btn-active ui-state-persist");
		$('#registernav').show();
		$('#Register').show();
		$('#MediDet').hide();
		$('#bluth').hide();
		$('#chat1').hide();
		$('#skyp').hide();


	});
	$("#chat").click(function (){
		$('#registernav').hide();
		$('#Register').hide();
		$('#MediDet').hide();
		$('#bluth').hide();
		$('#chat1').show();
		$('#skyp').hide();

	});
	$("#videoch").click(function (){
		$('#registernav').hide();
		$('#Register').hide();
		$('#MediDet').hide();
		$('#bluth').hide();
		$('#skyp').show();
		$('#chat1').hide();
			// alert('Skype Clicked'); {android: 'com.skype.raider/com.skype.raider.Main'},
				/* StartApp.start(
				    {android: 'com.panasonic.psn.android.hdvcm,com.panasonic.psn.android.hdvcm.HdvcmLauncherActivity'},
				    startAppSuccess, startAppFail
				);*/

	});

	$("#hdvc_chat").click(function (){

			alert('Hdvcm Opening...');//  {android: 'com.skype.raider/com.skype.raider.Main'},
				 StartApp.start(

				    startAppSuccess, startAppFail,{android: 'com.panasonic.psn.android.hdvcm,com.panasonic.psn.android.hdvcm.HdvcmLauncherActivity'}
				);

	});

	$("#skype_chat").click(function (){

			alert('Skype  Opening...');
				 StartApp.start(

				    startAppSuccess, startAppFail,{android: 'com.skype.raider,com.skype.raider.Main'}
				);

	});
	$("#bth").click(function (){
		$('#registernav').hide();
		$('#Register').hide();
		$('#MediDet').hide();
		$('#chat1').hide();
		$('#bluth').show();
		$('#skyp').hide();

	});
	$("#logout").click(function (){
		$('#dispcontent').hide();
		$('#dispmenu').hide();
		db.transaction(userout, errorid, successid);
		$('#displogin').show();
		$('#lpassword').val("");


	});

	$("#Medidets1").click(function (){
		$('#registernav').show();
		$('#Register').hide();
		$('#MediDet').show();
		$('#bluth').hide();
		$('#chat1').hide();
		$('#skyp').hide();

	});
		$("#Medidets2").click(function (){
		$('#Register').hide();
		$('#MediDet').show();
		$('#bluth').hide();
		$('#chat1').hide();
		$('#skyp').hide();

	});
	$("#regs1").click(function (){


	});
	$("#regs2").click(function (){
		$('#Register').show();
		$('#MediDet').hide();
		$('#bluth').hide();
		$('#chat1').hide();
		$('#skyp').hide();

	});

	$("#serverbtn").click(function (){
	 if($('#server').val()=='Server Address')
	 alert("Please Enter Valid Server Address");
	else
	 db.transaction(ser, errorser, successser);


	});

$("#PtId").keyup(function(){
var vals =  $("#PtId").val();
if (vals=='') {
$('#onlyregister').show();
}else
$('#onlyregister').hide();
$('#displayresult').hide();
});
$("#Ptname").keyup(function(){
var valn =  $("#Ptname").val();
if (valn=='') {
$('#onlygetdet').show();
$("#Ptdob").val('');
$("#Ptadd").val('');
$("#Ptgender").val('');
$("#Ptmob").val('');
$("#Ptage").val('');
$("#Ptgender").slider('refresh');
}else
$('#onlygetdet').hide();
});
	$("#ptIdSrch").click(function(){
					alert("Press ok To Continue...");
			    		var r = $("#PtId").val();
			    		$("#uid").val(r);
			    		//$('#cmnpinner').show();
			    		GetPatientDetails();
			    		GetPatientResults();
			    	//db.transaction(readDB, errorCB, searchSuccessCB);
			    });

	$('audio').click(function(){
	//alert("audio...");
	});
});


	function startAppFail()
	{
		return;
	}
	function startAppSuccess()
	{
		return;
	}

function checkConnection()
{
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
}

function NewReg()
	{
		//alert ("Clicked!");
		if ($("#PtId").val() == 'Patient Id')
		{
		var pl = new SOAPClientParameters();
//		var valueId = $("#uid").val();
		var patientName = $("#Ptname").val();
		var patientDob = $("#Ptdob").val();
		var patientAddress =$("#Ptadd").val();
		var patientGender = $("#Ptgender").val();
		var patientMobileNo = $("#Ptmob").val();
		var patientPassword = "patient1";
		var patientDoctorid = "5001";

		if (checkConnection() == 'No network connection')
			alert ('No network connection');
		else
		{
			//alert (checkConnection());

			if ((patientName != "Patient Name") || (patientDob != "Date of Birth") || (patientMobileNo != "Mobile No.") || (patientAddress != "Address"))
				{

					pl.add("patientName", patientName);

					pl.add("patientDob", patientDob);

					pl.add("patientAddress", patientAddress);

					pl.add("patientGender", patientGender);
					pl.add("patientMobileNo", patientMobileNo);
					pl.add("patientPassword", patientPassword);
					pl.add("patientDoctorid", patientDoctorid);
					SOAPClient.invoke(patientRegUrl, "registration", pl, false, NewReg_callBack);
				}
				else
					alert ("No Values to Send");
			}

		}
		else
			alert ("Already Registered");
	}

	function NewReg_callBack(r)
	{
		alert(r);
		$("#PtId").val(r);
		$("#uid").val(r);
		$("#captimg").show();
	}

	/*function GetPatientDetails()
	{
		var patientId = $("#PtId").val();
		if ( patientId == 'Patient Id')
		{
			alert ('Enter Patient Id!');
		}
		else
		{
			var pl = new SOAPClientParameters();

			if (checkConnection() == 'No network connection')
				alert ('No network connection');
			else
			{
				//alert (getPatientUrl);

						pl.add("patientId", patientId);
						SOAPClient.invoke(getPatientUrl, "PatientsData", pl, false, GetPatient_callBack);
			}


		}

	}*/

	   function GetPatientDetails()
	    {
	      // alert("hai");
	        var patientId = $("#PtId").val();
	        if ( patientId == 'Patient Id')
	        {
	            alert ('Enter Patient Id!');
	           // $('#cmnpinner').hide();
	        }
	        else
	        {
	           // if (checkConnection() == 'No network connection'){
	             //   alert ('No network connection');
	               // $('#cmnpinner').hide();
	          //  }

	           // else
	          //  {
	                $('#cmnpinner').show();
	                var id = $("#PtId").val();
	                //alert(id);
	                $.ajax({
	                    'dataType': 'json',
	                    'type'    : 'GET',
	                    'url'     : 'http://greenocean.in/n-rest/index.php/api/example/pragoreget',
	                    'data'    : {data: id},
	                    'success' : function(data){
	                        //alert(data.response);
	                        if (data.response =='true')
	                        {
	                        	$('#displayresult').show();
	                         //   alert('Received Patient Details!');
	                         $('#disdet').html("");
	                         		$('#disdet').append("<th>Name</th><th>Id</th><th>Gender</th><th>Age</th>");
	                            	 $('#disdet').append("<tr><td>"+data.name+"</td><td>"+data.emp_id+"</td><td>"+data.sex+"</td><td>"+data.age+"</td></tr>");

	                            $("#Ptname").val(data.name);
	                            $("#Ptalid").val(data.emp_id);
                               $("#Ptmob").val(data.mobile);
	                            $("#Ptdob").val(data.dob);
	                            $("#Ptage").val(data.age);

	                            $("#Ptgender").val(data.sex);
	                            $("#Ptgender").slider('refresh');
	                            $("#Ptadd").val(data.address);
//GetPatientResults();
	                           // $('#cmnpinner').hide();
	                            }
	                    }
	                });
	            //}
	        }

	    }

	function GetPatientResults(){
	    //$('#cmnpinner').show();
//alert("asd");
			                var id = $("#PtId").val();

	                $.ajax({
	                    'dataType': 'json',
	                    'type'    : 'GET',
	                    'url'     : 'http://greenocean.in/n-rest/index.php/api/example/pragoregetres',
	                    'data'    : {data: id},
	                    'success' : function(data){
	                       // alert(data.response);
	                        if (data.response =='true')
	                        {
	                            //$('#cmnpinner').hide();

	                        	$('#displayresult').show();
										$('#RepResult').html("");
                         		$('#RepResult').append("<th>Temp</th><th>Spo2</th><th>Pulse</th><th>B.P</th>");
                            	$('#RepResult').append("<tr><td>"+data.temp+"</td><td>"+data.spo2+"</td><td>"+data.pulse+"</td><td>"+data.bp+"</td></tr>");

	                       	}
	                    }
	                });

	}

		function GetPatient_callBack(r)
	{
		//alert(r);
		var patientDetails =  new Array();
		if (r)
		{
			alert('Received Patient Details!');
			patientDetails = r.split('&');

			$("#Ptname").val(patientDetails[0]);
			$("#Ptage").val(patientDetails[2]);
			$("#Ptadd").val(patientDetails[3]);
			$("#Ptgender").val(patientDetails[1]);
			$("#Ptgender").slider('refresh');

			$("#Ptmob").val(patientDetails[4]);
			GetDoctorComment();
		}
		else
		{
			alert('Patient Id not valid!');
		}
	}
	function GetDoctorComment()
	{
		var patientId = $("#PtId").val();
			var pl = new SOAPClientParameters();

			if (checkConnection() == 'No network connection')
				alert ('No network connection');
			else
			{
				//alert (checkConnection());

						pl.add("patientId", patientId);
						SOAPClient.invoke(getPatientUrl, "PatientComment", pl, false, GetDoctorComment_callBack);
			}
	}
		function GetDoctorComment_callBack(r)
	{
		alert(r);
		if (r)
		{

			$("#doctorfb").html("Doctor's Last Feedback:" +r);
		}
		else
		{
			alert('No comments yet!');
		}
	}


	$(function(){//start

	$("#discoverBT").click(function (){discoverDevices();});
	




	$("#bpSend").click(function(){

			console.log( 'BP Send Clicked' );
			//HelloTo();
		

		//alert("Clicked");
			  $('#cmnpinner').show();
		var eid	=$("#empId").val();
		var valueId =$("#uid").val();
		var pulse ="0";
      var temp ="0";
      var bpValue ="0";
      bpValue = "null";
      var wscaltb="0";
      wscaltb = $("#wscalval").val();
      if(wscaltb)
       wscaltb = $("#wscalval").val(); else wscaltb = 0;


        if ( $("#sys").val() != "null")
            bpValue = $("#sys").val() + '/' + $("#dia").val();

        var glucoVal="0";
        glucoVal = $("#gluco").val();
            if(glucoVal)
            glucoVal = $("#gluco").val();  else glucoVal = 0;

        pulse = $("#pulse2").val();
        if(pulse)
            pulse = $("#pulse2").val();   else pulse = 0;
        temp = $("#therm").val();
        if(temp)
            temp = $("#therm").val();   else temp = 0;
        var spo2 ="0";

        if($("#spo22").val()) spo2 = $("#spo22").val(); else spo2 = 0;

        var ptComplaint = "0";
        ptComplaint = $("#PtComplaint").val();
        if(ptComplaint)
            ptComplaint = $("#PtComplaint").val();   else ptComplaint = 0;
        
        var d=new Date();
        var dat=d.getDate();

        var mon=d.getMonth()+1;
        var year=d.getFullYear();
        var todayDate = dat+"-"+mon+"-"+year;
        
        var currtime;
        var currhour;
        var currminute;
        var currsecond;
        var AP;

        currtime = new Date();
        currhour = currtime.getHours();
        currminute = currtime.getMinutes();
        currsecond = currtime.getSeconds();

        if (currminute < 10)
            currminute = "0" + currminute;

        if (currsecond < 10)
            currsecond = "0" + currsecond;

        AP = (currhour >= 12 ? "PM" : "AM");


        if (currhour > 12)
            currhour -= 12;
        else if(currhour == 0)
            currhour = 12;

        var chdate = currhour + ":" + currminute + ":" + currsecond + " " + AP;
           // document.write(chdate);

		//alert("inside");
		var data = new Array();
        data[0] = valueId;
        data[1] = pulse;
        data[2] = temp;
        data[3] = bpValue;
        data[4] = spo2;
        data[5] = glucoVal;
        data[6] = wscaltb;
        data[7] = ptComplaint;
        data[8] = todayDate;
        data[9] = chdate;
        
       // var vitalBP=$("#PreBP").val();

        var tempData = new Array();
        tempData=bpValue.split("/");
		//alert(data+","+tempData);
		$.ajax({
			url 	: 'http://greenocean.in/n-rest/index.php/api/example/upresult',
			dataType: 'json',
			type    : 'POST',
			data	: {data:data,data1:tempData},
			success : function (data){
			    $('#cmnpinner').hide();
				if (data.response =="true")
				alert (data.message);
				else
				alert(data.message);
				}
			});

		});

$('#ton').click(function () {

if(ton)
{
	ton=0;
$('#ton').val("Off");
var d = $("#ton" ).val();

torchonslide();

}
else {
	ton=1;
$('#ton').val("On");
var d = $("#ton" ).val();
torchoffslide();
 
}

//if(btnclicked)
	//	{
	//	btnclicked=0;
		//alert();
	//	switch ($("#ton" ).val())
	  //       {
	  //          case "On" : torchonslide();break;
	  //          case "Off": torchoffslide();break;
	  //       }
	//	}else alert("Please Wait Now Another Processing...");
 
});




	$("#temp").click(function ()
	{
		if(btnclicked)
		{
		btnclicked=0;
		//alert(btnclicked);
		dtype = 'm';
		divi = "+";
		$("#tempOrange").show(); $("#distmp").show();
		$("#tempspinner").show();
		$("#thermValueReturn").hide();
		$("#tempGreen").hide();
		$("#tempRed").hide();
		db.transaction(calltronic, temperror, tempsuccess);
		}else alert("Please Wait Now Another Processing...");
	});

	$("#bpm").click(function (){
		if(btnclicked)
		{
		btnclicked=0;
		dtype = 'b';
		divi = "+";
		$("#bpmOrange").show(); $("#disbp").show();
		$("#bpspinner").show();
		$("#bpmValueReturn").hide();
		$("#bpmGreen").hide();
		$("#bpmRed").hide();
		db.transaction(calltronic, bperror, bpsuccess);
		}else alert("Please Wait Now Another Processing...");
	});

	$("#DevAll").click(function (){
	    $('#cmnpinner').show();
	dtype = 'r';
	divi = "+";
	db.transaction(calltronic, daerror, bpsuccess);
	});

	$("#pox").click(function (){

		if(btnclicked)
		{
		btnclicked=0;
		dtype = 'p';
		divi = "+";
		$("#poxOrange").show();
		$("#dispox").show();
		$("#poxValueReturn").hide();
		$("#poxGreen").hide();
		$("#poxRed").hide();
		db.transaction(calltronic, poxerror, poxsuccess);
		}else alert("Please Wait Another Processing...");
	});
	// steth S//

	
	
	$("#steth").click(function (){
		 var idav =  $('#validationid').val();
		
if(idav){

			if(btnclicked)
			{
				btnclicked=0;
				dtype = 's';
				divi = "+";
				$("#stethOrange").show(); $("#dissth").show();
				$("#stethspinner").show();
				$("#stethGreen").hide(); $("#stethaud").hide();
				$("#stethRed").hide();
				db.transaction(calltronic, errorsteth, stethsuccess);
			}
			else 
			alert("Please Wait Now Another Processing...");

	}
else {
$('#erperid').show();
}	
	});
	// steth E// writeRfcomm('t');

	$("#torchOn").click(function (){


	});

	$("#ecg").click(function (){
	if(btnclicked)
	{
	btnclicked=0;
	var ptid = $("#uid").val();
	if (ptid=='Enter Id' )
	{
		alert ("Please Enter Patient Id!");
		$("#ecgOrange").hide();
		$("#ecgGreen").hide();
		$("#ecgspinner").hide();
		$("#ecgRed").show();
		btnclicked=1;
	}
	else
	{
		db.transaction(callecg, ecgerror, ecgsuccess);
	}
	}else alert("Please Wait Now Another Processing...");
	});

	$("#glucometer").click(function ()
	{
		if(btnclicked)
		{
		btnclicked=0;
		$("#glucometerOrange").show();
		$("#glucospinner").show();
		$("#glucoValueReturn").hide();
		$("#glucometerGreen").hide();
		$("#glucometerRed").hide();
		dtype = 'g';
		divi = "gu";
		db.transaction(callgluco, glucometererror, glucometersuccess);
		}else alert("Please Wait Now Another Processing...");

	});

	$("#wscale").click(function ()
	{
		if(btnclicked)
		{
		btnclicked=0;
		$("#wsOrange").show();
		$("#wsGreen").hide();
		$("#wsRed").hide();
		$('#wscalespinner').show();
		$("#wscaleValueReturn").hide();
		if(prediv!=''){ closeRfcomm();prediv=''}
		makeBTDiscoverable();
		}else alert("Please Wait Now Another Processing...");

	});

	$("#delch").click(function () {
		var x;
		var r=confirm("Delete All  Bluetooth Devices!");
		if (r==true)
		  {
		  delval();
		  selectval1();
		  }
		else{}
	});


});//end



	function HelloTo()
	{
		alert ("Uploading...");
		var pl = new SOAPClientParameters();
		var valueId = $("#uid").val();
		var bpValue = "null";
		var wscaltb =$("#wscalval").val();
		if ( $("#sys").val() != "null")
			bpValue = $("#sys").val() + '/' + $("#dia").val();


		//var bpValue = "120/80";
		//var pulse = "72";
		//var hrate = "70";
		//var temp = "98.4";
		//var spo2 = "99";
		var glucoVal = $("#gluco").val();
		var pulse = $("#pulse2").val(); //"72";
		//var hrate = "70";
		var temp = $("#therm").val();//"98.4";
		var spo2;
		//alert($("#spo22").val());
		if($("#spo22").val()) spo2 = $("#spo22").val(); else spo2 = 0;//"99";
		var ptComplaint = $("#PtComplaint").val();

	//	alert (pulse+','+temp+','+spo2+','+bpValue);
	//	pl.add("Celsius", valueId);
	//	SOAPClient.invoke(url, "CelsiusToFahrenheit", pl, true, HelloTo_callBack);
		if (checkConnection() == 'No network connection')
			alert ('No network connection');
		else
		{
			//alert (checkConnection());
			if ( (valueId != "Enter Id") && (valueId != ''))
			{
				if ((bpValue != "null") || (temp != "null") || (spo2 != "0") || (glucoVal != "0")||(wscaltb) || (ptComplaint !="Mention Complaints"))
				{

					pl.add("patientId", valueId);
					pl.add("patientHrate", '');
					pl.add("patientHpulse", pulse);
					pl.add("patientBgroup", '');
					pl.add("patientTemp", temp);

					pl.add("patientBp", bpValue);
					pl.add("patientSpo2", spo2);
					pl.add("patientGlucose", glucoVal);
					pl.add("patientWeight", wscaltb);
					pl.add("patientComplaint", ptComplaint);
					SOAPClient.invoke(newurl, "insertData", pl, false, HelloTo_callBack);
				}
				else
					alert ("No Values to Send");
			}
			else
				alert ("Enter the Id!");
		}
	}

	function HelloTo_callBack(r)
	{
		alert(r);

	}
	function makeBTDiscoverable()
	{
		window.plugins.BluetoothPlugin.read4( function(r) {
		//alert( 'Bluetooth Enabled' );
		//alert(r);
		if(r=="No Device")
		{
			alert("Weghing Scale Not Connected");
			$('#wscalespinner').hide();
			$('#wsOrange').hide();
			$('#wsRed').show();
			$('#wsGreen').hide();
		}
		else
		{
			$("#wscalval").val(r);
			$("#wscaleValueReturn").html($("#wscalval").val()+'Kg');
			$("#wscaleValueReturn").show();
			$('#wscalespinner').hide();
			$('#wsOrange').hide();
			$('#wsRed').hide();
			$('#wsGreen').show();
		}
		btnclicked=1;

		}, function(error) {
		alert( 'Error Enabling BT Discoverable: ');
		$('#wsRed').show();$('#wsOrange').hide();
		$('#wsGreen').hide();$('#wscalespinner').hide();
		//closeRfcomm();
		} );
	}

	function calltronic(tx, results)
	{
		tx.executeSql('SELECT * FROM Bluevalue where devtype="+tronic SwissKnife"', [], getselect, errorCB);
	}


	function callecg(tx, results)
	{
	dtype = 'e';
	divi = "ec";
	$("#ecgOrange").show();
	$("#ecgspinner").show();
	$("#ecgGreen").hide();

	$("#ecgRed").hide();
	tx.executeSql('SELECT * FROM Bluevalue where devtype="3 Lead ECG"', [], getselect, errorecg);

	}
	function errorecg()
	{
		alert("ECG Connecting Error...");

	}

	function torchonslide()
	{
		
		dtype = 't';
		divi = "+";
		$("#torchOrange").hide();
		$("#torchGreen").show();
		$("#torchRed").hide();
		$("#trchimg").attr("src","images/torchon.png");
	db.transaction(calltronic, torcherror, torchsuccess);

	}

	function torchoffslide()
	{
		
		dtype = 'x';
		divi = "+";
		$("#torchOrange").hide();
		$("#torchGreen").hide();
		$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png");
		$('#ton').val('Off');
		//writeRfcomm('x');
		$("#trchimg").attr("src","images/torchof.png");
		db.transaction(calltronic, torcherror, torchsuccess);

	}

	function callgluco(tx, results)
	{
	tx.executeSql('SELECT * FROM Bluevalue where devtype="Ultra2 Glucometer"', [], getselect, errorCB);

	}


	function getselect(tx, results)
	{
		var tablen = results.rows.length;

		if(tablen==0)
		{
			switch (dtype)
				{
					case 'g' : 	alert("Please Connect Device On Settings Menu... ");
							$('#glucospinner').hide();$("#glucometerRed").show();
							$("#glucometerOrange").hide();break;
					case 'm' : 	alert("Please Connect Device On Settings Menu... ");
							$('#tempspinner').hide(); $("#tempRed").show(); $("#tempOrange").hide(); $("#distmp").hide();break;
					case 'e' : 	alert("Please Connect Device On Settings Menu... ");
							$('#ecgspinner').hide(); $("#ecgRed").show(); $("#ecgOrange").hide();break;
					case 's' : 	alert("Please Connect Device On Settings Menu... ");
						        $('#stethspinner').hide();$("#stethRed").show(); $("#stethOrange").hide(); $("#dissth").hide(); $("#stethGreen").hide(); $("#stethaud").hide();break;
					case 't' : 	alert("Please Connect Device On Settings Menu...");
							$('#torchspinner').hide();$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png"); $('#ton').val('Off');//.slider("refresh");
							$("#torchOrange").hide();$("#torchGreen").hide();break;
					case 'x' :	alert("Please Connect Device On Settings Menu... ");
							$('#torchspinner').hide();$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png"); $('#ton').val('Off');//.slider("refresh");
							$("#torchOrange").hide();$("#torchGreen").hide();break;
					case 'b' :	alert("Please Connect Device On Settings Menu...");
							$('#bpspinner').hide();$("#bpmRed").show(); $("#bpmOrange").hide(); $("#disbp").hide();break;
					case 'p' : 	alert("Please Connect Device On Settings Menu... ");
							$('#poxspinner').hide();$("#poxRed").show(); $("#poxOrange").hide(); $("#dispox").hide();break;
					case 'r' :	alert("Please Connect Device On Settings Menu... ");
									break;
				}
				btnclicked=1;
		}
		else
		{
			for( var i = 0; i < tablen; i++ )
			{
				//$('#resvaldiisp').append(" name = " + results.rows.item(i).dname + " address =  " + results.rows.item(i).daddress);
				$('#resvaldiisp').html(results.rows.item(i).daddress);

				//alert($('#resvaldiisp').text());
				var tempclickval= $('#resvaldiisp').text();
			}
			openRfcomm();
		}

	}
	function discoverDevices()
	 {
 		$("#disimg").show();
 	  	window.plugins.BluetoothPlugin.discoverDevices( function(devices) {
		$("#disimg").hide();
		$("#bt-devices-select").show();
		$('#bt-devices-select').html('');
 	   	$('#bt-devices-select').append( $( '<option value="null">-select Device From List-</option>' ) );
 	   	for( var i = 0; i < devices.length; i++ )
		 {
 	   		$('#bt-devices-select').append( $( '<option value="' + devices[i].address + '">' + devices[i].name + '</option>' ) );
 	      	 }

	    }, 	function(error) { alert( 'Error during Discovery'); 
$("#disimg").hide();	   
$("#bt-devices-select").hide(); 
	    } );

  	  }
	function writeRfcomm(data)
         {
		$('#bt-data-dump').html( '');
		window.plugins.BluetoothPlugin.write( bp_writeSuccess, bp_writeError, g_socketid,data );
	 }

	function bp_writeSuccess( p_data )
	 {
	 	// Continue reading...
	 	window.plugins.BluetoothPlugin.read( bp_readSuccess, bp_readError, g_socketid );
		return;
	}

	function bp_writeError( error )
	{
		alert( "Error Sending Command To Device..." );
		closeRfcomm();

	}

	function ser(tx)
	{
		tx.executeSql('DROP TABLE IF EXISTS servertbl');
	        tx.executeSql('CREATE TABLE IF NOT EXISTS servertbl (servername)');
		tx.executeSql('INSERT INTO servertbl (servername) VALUES ("' +$('#server').val()+'")');

	}
	function errorser()
	{
	}
	function successser()
	{
	$('#curser').html('Current Server Address: '+$('#server').val());
	 newurl = "http://"+$('#server').val()+"/axis2/services/PatientsWs";
	 patientRegUrl = "http://"+$('#server').val()+"/axis2/services/PatientsRegWs";
	 getPatientUrl = "http://"+$('#server').val()+"/axis2/services/PatientRetrieveWs";
	//alert(newurl);alert(patientRegUrl);alert(getPatientUrl);
	}

	function userin(tx)
	{
		//alert("login...");

		//tx.executeSql('DELETE FROM ');
		tx.executeSql('DELETE FROM userid', [], delval1, errorCB);
		tx.executeSql('INSERT INTO userid (uid) VALUES ("1")');
	}

	function userout(tx)
	{
		tx.executeSql('DELETE FROM userid', [], delval1, errorCB);
		tx.executeSql('INSERT INTO userid (uid) VALUES ("0")');
	}


	function errorid(){}
 	function successid(){}

	function userdelete(tx)
	{

		   	tx.executeSql('DELETE FROM user');
			tx.executeSql('INSERT INTO user (username,password) VALUES ("admin","' + $('#newpwd').val()+'")');



        }

	function successChange()
	{
		alert("Your Password Has Been changed...");
	}
	function errorpwd()
	{
		alert("Enter New Pass...");
	}


	function initializeDB(tx)
	{
    	//tx.executeSql('DROP TABLE IF EXISTS Bluevalue');
          tx.executeSql('CREATE TABLE IF NOT EXISTS Bluevalue (id unique ,dname unique ,daddress unique , devtype unique)');
	 // tx.executeSql('DROP TABLE IF EXISTS user');
	  tx.executeSql('CREATE TABLE IF NOT EXISTS user (username unique , password, id)');
	  tx.executeSql('CREATE TABLE IF NOT EXISTS userid (uid)');
	//tx.executeSql('INSERT INTO userid (uid) VALUES ("0")');
	 // tx.executeSql('INSERT INTO user (username, password) VALUES ("admin","admin")');
	//alert(serpassword);
	  tx.executeSql('SELECT * FROM user', [], readuser, errorCB);
	tx.executeSql('SELECT * FROM userid', [], readuserid, errorCB);

        // tx.executeSql('INSERT INTO Bluevalue (dname, daddress, devtype) VALUES ("user-PC","00:15:83:23:F5:3C","+tronic SwissKnife")');
	//tx.executeSql('INSERT INTO Bluevalue (dname, daddress, devtype) VALUES ("RN42-A6A0","00:06:66:42:A6:A0","3 Lead ECG")');
	}

	function successCB()
	{
        //alert("ASHA+ is now loaded!");
        //alert("success!");
   	}

	function temperror(err) {
   	alert("Thermometer Not Connected " + err.code);
  	}

	function daerror(err) {
   	alert("Device Not Connected " + err.code);
  	}


	function bperror(err) {
   	alert("B.P Not Connected " + err.code);
  	}
	function poxerror(err) {
   	alert("Pulse Oximeter Not Connected " + err.code);
  	}
	function errorsteth(err) {
   	alert("Stethhoscope Not Connected " + err.code);
  	}
	function errorCB(err) {
   	alert("Error processing SQL: " + err.code);

  	}
	function glucometererror(err) {
   	//alert("Error processing SQL: " + err.code);
	alert("Glucometer Connecting Error :"+ err.code);

  	}

	function ecgerror(err) {
   	//alert("Error processing SQL: " + err.code);
	alert("ECG Connecting Error :"+ err.code);
	}

	function torcherror(err) {
   	//alert("Error processing SQL: " + err.code);
	alert("Torch Connecting Error :"+ err.code);
	$('#ton').val('On');//.slider("refresh");
	}



	function errorIST(err) {
   	//alert("Error processing SQL: " + err.code);
	alert("Duplicate Entry Not Allowed");
  	}

	function insertTB(tx)
	{
	   var devaddress = $("#bt-devices-select").val();
	   var devname = $("#bt-devices-select option:selected").text();
	   //var devna = 1;
           var devtype = $("#bt-bondeddevices-select").val();
	   if((devname!="-select Device From List-")&&(devaddress!="null")&&(devtype!="null"))
	   tx.executeSql('INSERT INTO Bluevalue (dname , daddress,devtype) VALUES ("' +devname+'","'+devaddress+'","'+devtype+'")');
	   else
		alert("Empty Value Not Allowed !");
	}

	function successTB()
	{
        //alert("ASHA+ is now loaded!");
     	//  alert("Inserted!");
   	}

	function tempsuccess()
	{
        //alert("ASHA+ is now loaded!");

   	}

	function bpsuccess()
	{
        //alert("ASHA+ is now loaded!");

   	}
	function poxsuccess()
	{
        //alert("ASHA+ is now loaded!");

   	}

	function stethsuccess()
	{
        //alert("ASHA+ is now loaded!");

   	}
	function ecgsuccess()
	{
        //alert("ASHA+ is now loaded!");
	}
	function glucometersuccess()
	{
        //alert("ASHA+ is now loaded!");
 	}


	function successTBS()
	{
        //alert("ASHA+ is now loaded!");
        //  alert("Selected!");
   	}

	function torchsuccess()
	{
		//alert("torch On  ");
	}
	function selectTB(tx)
	{
	tx.executeSql('SELECT * FROM Bluevalue', [], readSuccess, errorCB);
	console.log('SELECT * FROM Bluevalue');
	}


function selectserver(tx)
	{
	tx.executeSql('CREATE TABLE IF NOT EXISTS servertbl (servername)');


	tx.executeSql('SELECT * FROM servertbl', [], readserver, errorCB);
	console.log('SELECT * FROM servertbl');
	}
	function errorserver()
	{
	}
	function successserver()
	{
	}
	function deleteTV(tx)
	{
	 tx.executeSql('DELETE FROM Bluevalue where dname="'+devicetodelete+'"', [], delval1, errorCB);
         //console.log('SELECT * FROM Bluevalue');
	}
	function deleteAll(tx)
	{
	//alert("Delete All");
	 tx.executeSql('DELETE FROM Bluevalue ', [], delvalAll, errorCB);
         //console.log('SELECT * FROM Bluevalue');
	}
	function delval1()
	{
	 //alert("deleted");
	}
	function delvalAll()
	{
	 //alert("deleted");
	//readSuccess();
	}

	function readserver(tx, results)
	{
		 var len = results.rows.length;
		var serverAddr = "www.clinic2care.com";
		if(len==0)
		{
			tx.executeSql('INSERT  INTO servertbl (servername) VALUES ("'+serverAddr+'")');
		}
		else
		{
			serverAddr = results.rows.item(0).servername;
		}
		//alert("Server Address set to: "+serverAddr);
		$('#curser').html('Current Server Address: '+serverAddr);
	 	newurl = "http://"+serverAddr+"/axis2/services/PatientsWs";
	 	patientRegUrl = "http://"+serverAddr+"/axis2/services/PatientsRegWs";
	 	getPatientUrl = "http://"+serverAddr+"/axis2/services/PatientRetrieveWs";
		//alert(newurl);alert(patientRegUrl);alert(getPatientUrl);
	}


	function readuserid(tx, results)
	{
		 var len = results.rows.length;
		//var serverAddr = "www.clinic2care.com";
		if(len==0)
		{
			tx.executeSql('INSERT INTO userid (uid) VALUES ("0")');
		}
		else
		{

			  seruserid = results.rows.item(0).uid;

			if(seruserid=="1")
			{
				$('#dispcontent').show();
				$('#dispmenu').show();
				$('#displogin').hide();

			}


		}


	}

	function readuser(tx, results)
	{
		 var len = results.rows.length;
		//var serverAddr = "www.clinic2care.com";
		if(len==0)
		{
			tx.executeSql('INSERT INTO user (username, password) VALUES ("admin","admin")');
		}
		else
		{
			  serusername = results.rows.item(0).username;
			  serpassword = results.rows.item(0).password;

			//alert(serpassword);
		}


	}
	function readSuccess(tx, results)
	{

	  var len = results.rows.length;
          if(len==0)$('#readSuccess1').html( "No Devices Available.");
	  else
	  	$('#readSuccess1').html("");
	  $('#readSuccess').append("<table border>");
	  $('#readSuccess').html("<th>Device Name</th><th>Device Address</th><th>Device Type</th><th> </th>");
    	  for (var i=0;i<len; i++)
	    {

         $('#readSuccess').append("<tr><td>"+results.rows.item(i).dname+"</td><td>"+ results.rows.item(i).daddress +"</td><td>"+ results.rows.item(i).devtype +"</td><td alidn='center'><a href='#' class='del_ExpenseRow'><img src='images/delete.png' border='0' width='40' height='40' class='textmiddle' ></img></a></td></tr>");
	//   $('#readSuccess').append("Row = " + i + " name = " + results.rows.item(i).dname + " address =  " + results.rows.item(i).daddress);


       	    }
	}




	function bp_readSuccess( p_data ) {
	if (p_data == "Timeout")
	{
		alert("Unable to continue communication with device");
		closeRfcomm();
	}
	else
	{
		var getVal = new Array();
		getVal = p_data.split(/,|\s|_/);
		var deg = 248;
		//alert(p_data[0]);
		//$('#bt-data-dump').html('<br><b>'+getVal[0]+'</b>' );
		switch (getVal[0])
		{
	 		case 'M' : $('#measuring-dump').html('<br><b>Measuring... </b>' );
	   			  // $('#measuring-dump').show();
				   window.plugins.BluetoothPlugin.read( bp_readSuccess, bp_readError, g_socketid );
				  //closeRfcomm();
				   break;
			case 'E' : var errordisplay ='';
				   var eI = 0;
				   var eJ = 0;
				   for (eI=1;eI<getVal.length-1;eI++)
				   {
					errordisplay = errordisplay + getVal[eI] + ' ';
				   }
				   //$('#error-dump').html('<br><b>Error: ' + errordisplay + '</b>' );
				  // $('#error-dump').show();

					switch (dtype)
					{
						case 'g' : 	alert(errordisplay);
								$('#glucospinner').hide();$("#glucometerRed").show();
								$("#glucometerOrange").hide();break;
						case 'm' : 	alert(errordisplay);
								$('#tempspinner').hide(); $("#tempRed").show(); $("#tempOrange").hide(); $("#distmp").hide();break;
						case 'e' : 	alert(errordisplay);
								$('#ecgspinner').hide(); $("#ecgRed").show(); $("#ecgOrange").hide();break;
						case 's' : 	alert(errordisplay);
							        $('#stethspinner').hide();$("#stethRed").show(); $("#stethOrange").hide(); $("#dissth").hide();$("#stethGreen").hide(); $("#stethaud").hide();break;
						case 't' : 	alert(errordisplay);
								$('#torchspinner').hide();$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png"); $("#torchOrange").hide();
								$('#ton').val('Off');//.slider("refresh");
								break;
						case 'x' :	alert(errordisplay);
								$('#torchspinner').hide();$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png");
								$("#torchOrange").hide();$('#ton').val('Off');//.slider("refresh");
								break;
						case 'b' :	alert(errordisplay);
								$('#bpspinner').hide();$("#bpmRed").show(); $("#bpmOrange").hide(); $("#disbp").hide();break;
						case 'p' : 	alert(errordisplay);
								$('#poxspinner').hide();$("#poxRed").show(); $("#poxOrange").hide(); $("#dispox").hide();break;

					}
					btnclicked=1;
	  			   closeRfcomm();
				   break;
			case 'C' : $('#bt-data-dump').html('<br><b>' + getVal[1] + ' ' + getVal[2] + '...</b>' );
				   if ((dtype == 'x') || (dtype == 't'))
					{
						$("#torchspinner").hide();
						//closeRfcomm();
						btnclicked=1;
						prediv = divi;
						$('#bt-data-dump').hide();
				 		  $('#error-dump').hide();
					}
				else if(dtype == 'r')
			{
				//alert("device vlaue :"+getVal[1] + ' ' + getVal[2] );
				//set all the values
				$("#sys").val(getVal[8]);
				   $("#dia").val(getVal[9]);
				   $("#bpmValueReturn").html('SYS :'+$("#sys").val()+'<br>DIA :'+ $("#dia").val());
				   $("#bpmValueReturn").show();
				  	$("#spo22").val(getVal[6]);
				   $("#pulse2").val(getVal[7]);
				    $("#poxValueReturn").html('SpO2 :'+$("#spo22").val()+'%<br>Pulse :'+ $("#pulse2").val());
				    $("#poxValueReturn").show();
				     $("#thermValueReturn").html(getVal[5]+'&deg;F<br>'+ getVal[4]+'&deg;C');
				     $("#therm").val(getVal[5]+'&deg;F');
				    
				     $("#thermValueReturn").show();

				//alert("device vlaue :"+getVal[1] + ' ' + getVal[2] +' ' + getVal[3] +' ' + getVal[4] +' ' + getVal[5] +' ' + getVal[6]);
				window.plugins.BluetoothPlugin.read5( bp_readSuccess5, bp_readError, g_socketid );
				}
			           else

					{
					 window.plugins.BluetoothPlugin.read( bp_readSuccess, bp_readError, g_socketid );
					//$('#bt-data-dump').show();
				 	  $('#error-dump').hide();
					}

				  // closeRfcomm();
				   break;
			case 'B' : $("#sys").val(getVal[1]);
				   $("#dia").val(getVal[2]);
				  // $('#bpm-dump').show();
				   $("#bpmValueReturn").html('SYS :'+$("#sys").val()+'<br>DIA :'+ $("#dia").val());
				   $("#bpmValueReturn").show();
				   $("#bpspinner").hide();
				   $("#bpmOrange").hide(); $("#disbp").hide();
				   $("#bpmGreen").show();
				   $('#error-dump').hide();
				   $('#bt-data-dump').hide();
				prediv = divi;
				btnclicked=1;
				 //  closeRfcomm();
				   break;
			case 'O' : $("#spo22").val(getVal[1]);
				   $("#pulse2").val(getVal[2]);
				   //$('#spo2-dump').show();
				   // $("#poxValueReturn").show();
				   $("#poxValueReturn").html('SpO2 :'+$("#spo22").val()+'%<br>Pulse :'+ $("#pulse2").val());

				   $("#poxspinner").hide();
				   $('#poxOrange').hide(); $('#dispox').hide();
				   $('#poxGreen').show();
				   $("#poxValueReturn").show();
				   $('#error-dump').hide();
				   $('#bt-data-dump').hide();
				   //closeRfcomm();
				btnclicked=1;
				prediv = divi;
				   break;
			case 'T' : $("#thermValueReturn").html(getVal[3]+'&deg;F<br>'+ getVal[1]+'&deg;C');
					$("#therm").val(getVal[3]);
				   //$('#therm-dump').show();
	 			   $('#error-dump').hide();
				   $('#bt-data-dump').hide();//&deg;F
				   $("#tempOrange").hide(); $("#distmp").hide();
	    			   $("#tempspinner").hide();
			           $("#tempGreen").show();
				   $("#thermValueReturn").show();
				   $("#tempRed").hide();
				   //closeRfcomm();
				btnclicked=1;
				prediv = divi;
				   break;
			   case 'R' :
			//set all the values
				$("#sys").val(getVal[5]);
				   $("#dia").val(getVal[6]);
				   $("#bpmValueReturn").html('SYS :'+$("#sys").val()+'<br>DIA :'+ $("#dia").val());
				   $("#bpmValueReturn").show();
				  	$("#spo22").val(getVal[3]);
				   $("#pulse2").val(getVal[4]);
				    $("#poxValueReturn").html('SpO2 :'+$("#spo22").val()+'%<br>Pulse :'+ $("#pulse2").val());
				    $("#poxValueReturn").show();
				     $("#thermValueReturn").html(getVal[2]+'&deg;F<br>'+ getVal[1]+'&deg;C');
				     $("#therm").val(getVal[2]);
                   //  alert($("#therm").val(getVal[2]+'&deg;F'));
				     $("#thermValueReturn").show();

				//alert("device vlaue :"+getVal[1] + ' ' + getVal[2] +' ' + getVal[3] +' ' + getVal[4] +' ' + getVal[5] +' ' + getVal[6]);
				window.plugins.BluetoothPlugin.read5( bp_readSuccess5, bp_readError, g_socketid );
				break;

			case 'P' : if (headerVal==1)
					{
						headerVal=0;
						console.log("Gluco Recv");
						window.plugins.BluetoothPlugin.read( bp_readSuccess, bp_readError, g_socketid );
					}
					else
					{
						headerVal = 1;
						$("#glucoValueReturn").html(getVal[9]);//$('#gluco-dump').show();//&deg;F
						$("#gluco").val(getVal[9]);
						$("#glucometerOrange").hide();
						$("#glucospinner").hide();
						$("#glucoValueReturn").show();
						$("#glucometerGreen").show();
						//closeRfcomm();
						btnclicked=1;
						prediv = divi;
					}
					break;

		}
	}
	return;
}


	function writeEcg(data) {

		//$('#bt-data-dump').html( 'Measuring ECG...');
		//$('#ecgspinner').show();
		//$('#bt-data-dump').show();
		$('#chart1').hide();
		$('#chart2').hide();
		//$('#chart3').hide();
		$('#error-dump').hide();
		dataCnt = 0;
		getPlotVal='';
		dataValidECG = 0;

		window.plugins.BluetoothPlugin.write( bp_writeSuccess2, bp_writeError, g_socketid,data );

	}


	function writeSteth(data) {
		//$('#bt-data-dump').html( 'Streaming Steth...');
		$('#stethspinner').show();
		//$('#bt-data-dump').show();
		$('#error-dump').hide();
		window.plugins.BluetoothPlugin.write( bp_writeSuccess3, bp_writeError, g_socketid,data );
	}
	function bp_readError( error ) {
		alert( 'Error Receiving From Device...');

		$('#bpspinner').hide();
		$('#poxspinner').hide();
		$('#tempspinner').hide();
		$('#glucospinner').hide();
		$('#wscalespinner').hide();
		$('#torchspinner').hide();
		$('#stethpinner').hide();
		$('#ecgspinner').hide();
		closeRfcomm();

	}
	function enableBT() {
		window.plugins.BluetoothPlugin.enable( function() {
			//alert( 'Bluetooth Enabled' );
			//listBondedDevices();
		}, function(error) {
			alert( 'Error enabling Bluetooth.. ');

		} );
	}



        function onFileSystemSuccess(fileSystem) {
	//console.log(fileSystem.name);
        console.log(fileSystem.root.fullPath);
        // parentDir = fileSystem.root.fullPath;
        var dir = fileSystem.root;

        dir.getDirectory("prago", {create : true , exclusive : false},successCr,fail);

    }

	function successCr(dir)
	{
		parentDir = dir;

        console.log("Parent Dir: " + parentDir.fullPath);
       // createThumbNails();
       // dir.getDirectory("KVideos", {create : true , exclusive : false},gotFS,fail);


	}
     	function fail(evt) {
        	console.log(evt.target.error.code);
   	}
	function ecgbtreadsuccess()
	{
		parentDir.getFile("ecg.txt", {create: true}, gotEcgFileEntry, failFileEntry);
		//bp_readSuccess2();
	}

	function gotEcgFileEntry(fileEntry)
	{
	fileEntry.file(gotEcgFile, failFileEntry);
	}
	function gotEcgFile(file){
		//readAsText(file);
		ecgFilePath = file.fullPath;
		console.log(ecgFilePath);
       		readAsText(file);
	}
	function gotFileWriter() {
 	console.log('File Upload');
        var ptid = $("#uid").val();
	//var p_data = "file:///mnt/sdcard/prago/ecg.txt";
	 var p_data = ecgFilePath;
       	var options = new FileUploadOptions();

        options.fileKey="file1";
    	var todaysDate=new Date();
	var curr_date = todaysDate.getDate();
	var curr_month = todaysDate.getMonth();
       	var curr_year = todaysDate.getFullYear();
       	var curr_hour = todaysDate.getHours();
       	var curr_min = todaysDate.getMinutes();
	var ecgdate = curr_year + '' + curr_month + '' + curr_date + '' + curr_hour + '' + curr_min;

        options.fileName= ptid + '_' + ecgdate  + '_' +  p_data.substr(p_data.lastIndexOf('/')+1);
      	console.log("Renamed ECG File Name: " + options.fileName);
        options.mimeType="text/plain";
        options.chunkedMode = false;
        console.log("File Upload..");
	if (checkConnection() == 'No network connection')
	{

		$("#ecgOrange").hide();
		$("#ecgRed").show();
		$("#ecgGreen").hide();
		$("#ecgspinner").hide();
		closeRfcomm();
		alert ('No network connection');
	}
	else
	{
		var ft = new FileTransfer();
		ft.upload(p_data, "http://clinic2care.com/upload.jsp", ECGUploadSuccess, ecguploadfail, options);
	}
}
        function stethuploadfail(evt)
	{
	       	console.log(evt);
		//alert("Unable To Upload Please Try Again!");
		$("#stethspinner").hide();
		$("#stethRed").show();
		$("#stethOrange").hide(); $("#dissth").hide();
		$("#stethGreen").hide(); $("#stethaud").hide();
		 closeRfcomm();
   	 }
	function ecguploadfail(evt)
	{
	       	console.log(evt);
   	 }
function ECGUploadSuccess()
{
	alert("ECG Uploaded");
	$("#ecgOrange").hide();
	$("#ecgGreen").show();
	$("#ecgspinner").hide();
	$("#ecgRed").hide();
	//closeRfcomm();
	btnclicked=1;
	prediv = divi;
}

function failFileEntry(error) {
        console.log(error.code);
	closeRfcomm();
    }

function readAsText(file) {

        var reader = new FileReader();

        reader.onload = function(evt) {
        console.log("Read as Data URL");
        console.log(evt.target.result.length);
           //var decodeData =atob(evt.target.result);
         //   var p_data = decodeData.substring(19,decodeData.length)
             //console.log(decodeData.length);
         //   console.log(decodeData[0] + ' ' + p_data[0]);
            //bp_readSuccess2(evt.target.result);
             //var p_data = "13456789";
        bp_readSuccess2(evt.target.result);

        };
       reader.readAsText(file);

    }
function bp_readSuccess2(p_data) {
		if (p_data == "Aborted")
		{
			alert("Error recording ECG, please try again");
			$('#ecgGreen').hide();
			$('#ecgOrange').hide();
			$('#ecgRed').show();
			$('#ecgspinner').hide();
			 closeRfcomm();
		}
		else
		{
      	//dataCnt = p_data.length;
	plotString = '';
	var plotData = p_data.split(',');
      	dataCnt = plotData.length-1;
	$('#chart1').show();
	$('#chart2').show();
	$('#ecgspinner').hide();
	$('#ecgGreen').show();
	$('#ecgOrange').hide();
	//$('#chart3').show();
	console.log("Data Count: " + dataCnt);
			var inc = 0;
			var wordInc = 0;
			var incVal = 0;
			var incVal2 = 0;
			var plotVals = [];
			var plotValsLead2 = [];
			var plotValsLead3 = [];
			var incLen = dataCnt/2;
			console.log("incLen=" + incLen);
			for (inc = 0; inc < incLen;inc++)
			{
				wordInc = inc*2;
				incVal = Number(plotData[wordInc]);//p_data.charCodeAt(wordInc + 3) + (p_data.charCodeAt(wordInc+2) <<8) + (p_data.charCodeAt(wordInc+1) <<16)>>>0 ;
				if (inc == 8529)
				{
					console.log('Received Data');
					//$('#bt-data-dump').html('Received Data, processing for plot');
				}
				plotVals.push(incVal);
				//plotString += incVal + ',';
				incVal2 = Number(plotData[wordInc+1]);//p_data.charCodeAt(wordInc + 6) + (p_data.charCodeAt(wordInc+5) <<8) + (p_data.charCodeAt(wordInc+4) <<16)>>>0 ;
//				if (inc == 0) alert ('Test Code : ' + incVal + ' ' + plotData[wordInc]);
				plotValsLead2.push(incVal2);
				//incVal2 = incVal2 - incVal;
				//plotValsLead3.push(incVal2);
			}
					console.log('Processing for plot');
			  			var plot1 = $.jqplot ('chart1', [plotVals], {

								      title: {
								      			text: 'ECG Chart - Lead I',
								      			fontSize: 16,
								      			textColor: 'blue'
							      			},

								      axesDefaults: {
        												labelRenderer: $.jqplot.CanvasAxisLabelRenderer

      												},

									   axes: {
									        xaxis: {
									            // same options as axesDefaults
												ticks : [[0,"0"],[853,"1"],[1706,"2"],[2559,"3"],[3412,"4"],[4265,"5"],[5118,"6"],[5971,"7"],[6824,"8"],[7677,"9"],[8530,"10"]],
												label: 'Time in Seconds'
										},
										yaxis :{
											showTicks:false
										}
									    },
        								seriesDefaults: {
											            lineWidth:1,
											            color:'blue',
            											showMarker:false,
    	      								rendererOptions: {

              										smooth: true

        	  								}

      								}

    					}).replot();
    						  			var plot2 = $.jqplot ('chart2', [plotValsLead2], {

								      title: {
								      			text: 'ECG Chart - Lead II',
								      			fontSize: 16,
								      			textColor: 'green'
							      			},

								      axesDefaults: {
        												//labelRenderer: $.jqplot.CanvasAxisLabelRenderer

      												},

									   axes: {
									        xaxis: {
									            // same options as axesDefaults
												ticks : [[0,"0"],[853,"1"],[1706,"2"],[2559,"3"],[3412,"4"],[4265,"5"],[5118,"6"],[5971,"7"],[6824,"8"],[7677,"9"],[8530,"10"]]
												//label: 'Time in Seconds'
										},
										yaxis :{
											showTicks:false
										}
									    },
        								seriesDefaults: {
											            lineWidth:1,
											            color:'green',
            											showMarker:false,
    	      								rendererOptions: {

              										smooth: true

        	  								}

      								}

    					}).replot();
			  		/*	var plot3 = $.jqplot ('chart3', [plotValsLead3], {

								      title: {
								      			text: 'ECG Chart - Lead III',
								      			fontSize: 16
//								      			textColor: 'green'
							      			},

								      axesDefaults: {
        												//labelRenderer: $.jqplot.CanvasAxisLabelRenderer

      												},

									   axes: {
									        xaxis: {
									            // same options as axesDefaults
												ticks : [[0,"0"],[853,"1"],[1706,"2"],[2559,"3"],[3412,"4"],[4265,"5"],[5118,"6"],[5971,"7"],[6824,"8"],[7677,"9"],[8530,"10"]],
												//label: 'Time in Seconds'
										},
										yaxis :{
											showTicks:false
										}
									    },
        								seriesDefaults: {
											            lineWidth:1,
											            color:'black',

            											showMarker:false,
    	      								rendererOptions: {

              										smooth: true

        	  								}

      								}

    					}).replot();
      */

      			$('#bt-data-dump').hide();
			//$('#chart1').show();
//			console.log('plotString:' + plotString);
			//parentDir.getFile("ecg.txt", {create: true}, gotFileEntry, failFileEntry);
			gotFileWriter();
//			alert('Completed Pushing..');

		}
		return;
}

function bp_writeSuccess2( p_data ) {
	// Continue reading...
	window.plugins.BluetoothPlugin.read2( ecgbtreadsuccess, bp_readError, g_socketid );
	//bp_readSuccess2();
	return;
}

function bp_readSuccess3 (p_data)
{
		if (p_data == "Aborted")
		{
			//alert("Error recording Steth, please try again");
			$('#stethGreen').hide();
			$('#stethOrange').hide(); $('#dissth').hide();
			$('#stethRed').show();
			$('#stethspinner').hide();
			 closeRfcomm();
		}
		else
		{
		//$('audio').pause();
		$('audio').load();
                var options = new FileUploadOptions();
               // $('#bt-data-dump').html( 'Uploading to server...');
		//$('#bt-data-dump').show();
		$('#stethGreen').show();
		$('#dissth').show();
		
		$('#stethaud').show();
		
		$('#stethOrange').hide(); $('#dissth').hide();
		$('#error-dump').hide();
		var ptid = $("#uid").val();
          	options.fileKey="file1";
            	var todaysDate=new Date();
		var curr_date = todaysDate.getDate();
		var curr_month = todaysDate.getMonth();
	       	var curr_year = todaysDate.getFullYear();
	       	var curr_hour = todaysDate.getHours();
	       	var curr_min = todaysDate.getMinutes();
		var stethdate = curr_year + '' + curr_month + '' + curr_date + '' + curr_hour + '' + curr_min;

            options.fileName= ptid + '_' + stethdate  + '_' +  p_data.substr(p_data.lastIndexOf('/')+1);
            console.log("Renamed File Name: " + options.fileName);
            options.mimeType="audio/wav";
            options.chunkedMode = false;
            console.log("File Upload..");
 			if (checkConnection() == 'No network connection'){
				alert ('No network connection');
				 closeRfcomm();
				}
			else
			{
			    alert("1+1");
            	var ft = new FileTransfer();
            	ft.upload(p_data, "http://greenocean.in/cpclplus/uploadwav.php", stethUploadSuccess, stethuploadfail, options);
        	}
	}
}
function bp_readSuccess5 (p_data)
{
		if (p_data == "Aborted")
		{
			//alert("Error recording Steth, please try again");
			$('#stethGreen').hide();
			$('#stethOrange').hide(); $('#dissth').hide();
			$('#stethRed').show();
			$('#stethspinner').hide();
			 closeRfcomm();
		}
		else
		{
		//$('audio').pause();
		$('audio').load();
                var options = new FileUploadOptions();
               // $('#bt-data-dump').html( 'Uploading to server...');
		//$('#bt-data-dump').show();
		$('#stethGreen').show();
		$('#stethOrange').hide(); $('#dissth').hide();
		$('#error-dump').hide();
		var ptid = $("#uid").val();
        options.fileKey="file1";
        var todaysDate=new Date();
		var curr_date = todaysDate.getDate();
		var curr_month = todaysDate.getMonth();
	    var curr_year = todaysDate.getFullYear();
	    var curr_hour = todaysDate.getHours();
	    var curr_min = todaysDate.getMinutes();
		var stethdate = curr_year + '' + curr_month + '' + curr_date + '' + curr_hour + '' + curr_min;

            options.fileName= ptid + '_' + stethdate  + '_' +  p_data.substr(p_data.lastIndexOf('/')+1);
            console.log("Renamed File Name: " + options.fileName);
            options.mimeType="audio/wav";
            options.chunkedMode = false;
            console.log("File Upload..");
 			if (checkConnection() == 'No network connection'){
				alert ('No network connection');
				 closeRfcomm();
				}
			else
			{
			    //alert("1");
			   // alert(p_data);
            	var ft = new FileTransfer();
            	ft.upload(p_data, "http://greenocean.in/cpclplus/uploadwav.php", stethUploadSuccess, stethuploadfail, options);
            	// ft.upload(p_data, "http://greenocean.in/cpclplus/uploadwav.php", stethUploadSuccess, stethuploadfail, options);

        	}
	}
}

function stethUploadSuccess(r)
{
	//$('#bt-data-dump').html( 'Steth Recorded and Uploaded');$('#bt-data-dump').show();
	alert("Steth Recorded and Uploaded");
	$('#stethGreen').show();
	$('#stethaud').show();
	$('#stethOrange').hide(); $('#dissth').hide();
	$('#stethspinner').hide();
	$('#stethRed').hide();
	 //closeRfcomm();
	btnclicked=1;
	prediv = divi;


}
function bp_writeSuccess3( p_data ) {
	// Continue reading...
	window.plugins.BluetoothPlugin.read3( bp_readSuccess3, bp_readError, g_socketid );

	return;
}

//-------------------------------------------------------------//
function paring() {
		dtype = 'g';
		divi = "gu";
		prediv = divi;
		db.transaction(callgluco1, glucometererror, glucometersuccess);
		var das = $( '#bt-devices-select' ).val();
}

function callgluco1()
{
var das = $('#bt-devices-select' ).val();
openRfcomm1();
}
function openRfcomm1()
{
var tempdiv = prediv;
//alert($('#bt-devices-select' ).val());
	if ($('#bt-devices-select' ).val())
	{
	console.log( 'Discovery connect' );
		window.plugins.BluetoothPlugin.connect(
				function(socketId) {
					g_socketid = socketId;
					console.log( 'Socket-id: ' + g_socketid );
					//alert( 'Connected with ' + $('#resvaldiisp').text());

					closeRfcomm();
					insertredy();selectval1();
					console.log('dtype ' + dtype);

				},
				function(error) {
					switch (dtype)
					{
					case 'g' : 	alert('Unable to Connect...');
							break;
				}

				},
				$('#bt-devices-select' ).val(),
				"00001101-0000-1000-8000-00805f9b34fb"
		);
	}

}

//-----------------------------------------------------------//

function openRfcomm() {
var tempdiv = prediv;
	if(divi!=prediv)
	{
		if (prediv!='')
		closeRfcomm();
		prediv = tempdiv;
console.log("Connect "+$('#resvaldiisp').text());

	if ($('#resvaldiisp').text())
	{
	console.log( 'Discovery connect' );
		window.plugins.BluetoothPlugin.connect(
				function(socketId) {
					g_socketid = socketId;
					console.log( 'Socket-id: ' + g_socketid );
				//	alert( 'Connected with ' + $('#resvaldiisp').text());
					console.log('dtype ' + dtype);
					switch (dtype)
					{
						case 'g' : console.log("Gluco Write");
								alert("glucometer Connected  ");
  								writeRfcomm('g');break;
						case 'm' : console.log("thermometer Write");
					 			alert("Thermometer Connected  "); 									writeRfcomm('m');break;
						case 'e' : console.log("ECG Write");
								alert("ECG Connected  ");
								writeEcg('e');break;
						case 's' : console.log("Steth Write");
         							alert("Stethoscope Connected  ");
							        writeSteth('s');break;
						case 't' : console.log("torch Write");
								writeRfcomm('t');break;
						case 'x' : console.log("torch Write");
								writeRfcomm('x');break;
						case 'b' : console.log("B.P Write");
								alert("B.P Connected  ");
								writeRfcomm('b');break;
						case 'p' : console.log("finfer Oximeter");
								alert("Pulse Oximeter Connected  ");
								writeRfcomm('p');break;
						case 'r' : console.log("device all value");
								alert(" Connected");
								$('#cmnpinner').hide();


								$('#cmnpinner').hide();
								writeRfcomm('r');break;
					}
				},
				function(error) {
					//alert( 'Error: ' + error );
					//alert('Please Switch On Device...');


					switch (dtype)
					{
					case 'g' : 	alert('Please Switch On Device...');
							$('#glucospinner').hide();$("#glucometerRed").show();
							$("#glucometerOrange").hide();break;
					case 'm' : 	alert('Please Switch On Device...');
							$('#tempspinner').hide(); $("#tempRed").show(); $("#tempOrange").hide(); $("#distmp").hide();break;
					case 'e' : 	alert('Please Switch On Device...');
							$('#ecgspinner').hide(); $("#ecgRed").show(); $("#ecgOrange").hide();break;
					case 's' : 	alert('Please Switch On Device...');
						        $('#stethspinner').hide();$("#stethRed").show(); $("#stethOrange").hide(); $("#dissth").hide();$("#stethGreen").hide(); $("#stethaud").hide();
break;
					case 't' : 	alert('Please Switch On Device...');
							$('#torchspinner').hide();$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png"); $('#ton').val('Off');//.slider("refresh");
							$("#torchOrange").hide();$("#torchGreen").hide();break;
					case 'x' :	alert('Please Switch On Device...');
							$('#torchspinner').hide();$("#torchRed").show(); $("#trchimg").attr("src","images/torchof.png"); $('#ton').val('Off');//.slider("refresh");
							$("#torchOrange").hide();$("#torchGreen").hide();break;
					case 'b' :	alert('Please Switch On Device...');
							$('#bpspinner').hide();$("#bpmRed").show(); $("#bpmOrange").hide(); $("#disbp").hide();break;
					case 'p' : 	alert('Please Switch On Device...');
							$('#poxspinner').hide();$("#poxRed").show(); $("#poxOrange").hide(); $("#dispox").hide();break;
				}
				btnclicked=1;
					//closeRfcomm();
				},
				$('#resvaldiisp').text(),
				"00001101-0000-1000-8000-00805f9b34fb"
		);
	}
}
else
{
switch (dtype)
					{
						case 'g' : console.log("Gluco Write");
								alert("glucometer Connected  ");
  								writeRfcomm('g');break;
						case 'm' : console.log("thermometer Write");
					 			alert("Thermometer Connected  "); 									writeRfcomm('m');break;
						case 'e' : console.log("ECG Write");
								alert("ECG Connected  ");
								writeEcg('e');break;
						case 's' : console.log("Steth Write");
         							alert("Stethoscope Connected  ");
							        writeSteth('s');break;
						case 't' : console.log("torch Write");
								writeRfcomm('t');break;
						case 'x' : console.log("torch Write");
								writeRfcomm('x');break;
						case 'b' : console.log("B.P Write");
								alert("B.P Connected  ");
								writeRfcomm('b');break;
						case 'p' : console.log("finfer Oximeter");
								alert("Pulse Oximeter Connected  ");
								writeRfcomm('p');break;
						case 'r' : console.log("device all");
								alert("connected");
								writeRfcomm('r');break;

					}
}
//closeRfcomm();
}
function closeRfcomm() {prediv='';
	window.plugins.BluetoothPlugin.disconnect(
			function() {
				console.log( 'Disconnected');

			},
			function(error) {
				alert("Error During Disconnection...");

			},
			g_socketid
	);
			$('#stethspinner').hide();
			$('#bpspinner').hide();
			$('#poxspinner').hide();
			$('#tempspinner').hide();
			$('#glucospinner').hide();
			$('#wscalespinner').hide();
			$('#torchspinner').hide();
			$('#stethpinner').hide();
			$('#ecgspinner').hide();
			btnclicked=1;
}

$(function() {
    $( "#Ptdob" ).datepicker({changeYear: true,
            yearRange: 'c-30:c',
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            maxDate:"0D",
            onSelect: function (date) {
                var dob = new Date($("#Ptdob").val());
                var today = new Date();
                var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
                //alert(age);
                $('#Ptage').val(age);

           }
    });










// A bit of jQuery to call the getAge() function and update the page...


  });


