$(document).ready(function(){
	var user={};

	function register(e){
		user.idnumber = document.getElementById('idnumber').value;
		user.firstname = document.getElementById('firstname').value;
		user.lastname = document.getElementById('lastname').value;
		user.gender = document.getElementById('gender').value;
		user.bday = document.getElementById('bday').value;
		user.program = document.getElementById('program').value;
		user.yearlevel = document.getElementById('yearlevel').value;
		console.log(user);

		$.ajax({
			type:"POST",
			data:{action:"register", userdata:user},
			url:"src/php/user.php",
			success:function(response){
				idresponse = jQuery.parseJSON(response);
				var table = $("#usertable tbody");
				if(idresponse==0){
					alert("Error saving the user!");
				}else{
					user.id = idresponse;
					appendUser(user, table);
				}
				$("#userForm").find("input, select").val("");
			},
		});
		e.preventDefault();
	}

	function getUsers(){
		$.ajax({
			type:"GET",
			data:{action:"getusers"},
			url:"src/php/user.php",
			success:function(response){
				users = jQuery.parseJSON(response);
				var table = $("#usertable tbody");
				for(var i =0; i < users.length; i++){
					appendUser(users[i], table);
				}	
			},
		});
	}
	

	function appendUser(user, table){
		
		row = "<tr>"+
			"<th scope=\"row\" id='userID' data-id='user.id'>"+ user.id +"</th>"+
				"<td>"+ user.idnumber +"</td>"+
				"<td>"+ user.firstname +"</td>"+
				"<td>"+ user.lastname +"</td>"+
				"<td>"+ user.gender +"</td>"+
				"<td>"+ user.bday +"</td>"+
				"<td>"+ user.program +"</td>"+
				"<td>"+ user.yearlevel +"</td>"+
			   	"<td>" + "<button type='button'" + "class='btn btn-success userUpdate'" + "id='"+user.id+"'" + "uID='"+user.idnumber+"'" + "uFn='"+user.firstname+"'" + 
			   	" uLn='"+user.lastname+"'"+  "uGdr='"+user.gender+"'"+ "uBd='"+user.bday+"'"+ "uPg='"+user.program+"'"+ "uYl='"+user.yearlevel+"'"
			   	+"<b>Update</b>" + "</button>" + "</td>" +
		    	"<td>" + "<button type='button'" + "class='btn btn-danger delete'" + "id='"+user.id+"'" + "<b>Delete</b>" + "</button>" + "</td>" +
			"</tr>";		
		table.append(row);
	}
	
	$("#userForm").submit(register);
 
	getUsers();

/*----------User Update-----------*/

	// Get the modal
	modal = document.getElementById("myModal");
	// Get the button that opens the modal
	btn = document.getElementById("myBtn");
	// This closes the modal
	CancelButton = document.getElementsByClassName("close")[0];
	// When the user clicks on Cancel (x), close the modal
	CancelButton.onclick = function() {
	  modal.style.display = "none";
	}


//-----When The Update Button is Clicked display user data to be updated in modal and save the inputs-------------

	$(document).on("click",".userUpdate",function(){
	modal.style.display = "block";
	var uID = $(this).attr('uID');
	var ids = $(this).attr("id");
	var uFn = $(this).attr('uFn');
	var uLn = $(this).attr("uLn");
	var uGdr = $(this).attr('uGdr');
	var uBd = $(this).attr("uBd");
	var uPg = $(this).attr('uPg');
	var uYl = $(this).attr("uYl");
	$('input[id=idofuser]').val(ids);
	$('input[id=edit_idnumber]').val(uID);
	$('input[id=edit_firstname]').val(uFn);
	$('input[id=edit_lastname]').val(uLn);
	$('input[id=edit_gender]').val(uGdr);
	$('input[id=edit_bday]').val(uBd);
	$('input[id=edit_program]').val(uPg);
	$('input[id=edit_yearlevel]').val(uYl);
	});

//-----------When the 'Save Changes' button is clicked this function will connect to the php UPDATE query in update.php file-------------

$(document).on("click","#editUser",function(){
	
	var dataform =$('#edituserForm');
	userID = document.getElementById('idofuser').value;
	userIDnumber = document.getElementById('edit_idnumber').value;
	userFirstname = document.getElementById('edit_firstname').value;
	userLastname = document.getElementById('edit_lastname').value;
	userGender = document.getElementById('edit_gender').value;
	userBday = document.getElementById('edit_bday').value;
	userProgram = document.getElementById('edit_program').value;
	userYearlevel = document.getElementById('edit_yearlevel').value;

	  if(confirm("Are you sure you want to update this account?")){
			$.ajax({
				dataType: 'json',
				type:"POST",
				
				data:{action:"user_update", userID:userID, userIDnumber:userIDnumber, userFirstname:userFirstname,
					userLastname:userLastname, userGender:userGender, userBday:userBday,
					userProgram:userProgram, userYearlevel:userYearlevel },
				url:"src/php/user.php",

			});
	    }
	});

/*------------End of the Update Parts-------------------*/



/*------------When the 'Delete' Button is Clicked-------------------*/

	$(document).on("click",".delete",function(){
		var id = $(this).attr("id");

		if(confirm("Are you sure you want to delete this account?")){
			$(this).closest('tr').remove();
			$.ajax({
				type:"POST",
				data:{action:"delete_user", user_id:id},
				url:"src/php/user.php",
			
			});
		}
	});

});



