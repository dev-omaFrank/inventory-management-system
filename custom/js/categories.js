var manageCategoriesTable;
$(document).ready(function() {
	// active top navbar categories
	$('#navCategories').addClass('active');	

	manageCategoriesTable = $('#manageCategoriesTable').DataTable({
		'ajax' : 'php_action/fetchCategories.php',
		'order': []
	}); // manage categories Data Table

	// on click on submit categories form modal
	$('#addCategoriesModalBtn').unbind('click').bind('click', function() {
		// reset the form text
		$("#submitCategoriesForm")[0].reset();
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// submit categories form function
		$("#submitCategoriesForm").unbind('submit').bind('submit', function() {

			var categoriesName = $("#categoriesName").val();
			var categoriesStatus = $("#categoriesStatus").val();

			if(categoriesName == "") {
				$("#categoriesName").after('<p class="text-danger">Brand Name field is required</p>');
				$('#categoriesName').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#categoriesName").find('.text-danger').remove();
				// success out for form 
				$("#categoriesName").closest('.form-group').addClass('has-success');	  	
			}

			if(categoriesStatus == "") {
				$("#categoriesStatus").after('<p class="text-danger">Brand Name field is required</p>');
				$('#categoriesStatus').closest('.form-group').addClass('has-error');
			} else {
				// remov error text field
				$("#categoriesStatus").find('.text-danger').remove();
				// success out for form 
				$("#categoriesStatus").closest('.form-group').addClass('has-success');	  	
			}

			if(categoriesName && categoriesStatus) {
				var form = $(this);
				// button loading
				$("#createCategoriesBtn").button('loading');

				$.ajax({
					url : form.attr('action'),
					type: form.attr('method'),
					data: form.serialize(),
					dataType: 'json',
					success:function(response) {
						// button loading
						$("#createCategoriesBtn").button('reset');

						if(response.success == true) {
							// reload the manage member table 
							manageCategoriesTable.ajax.reload(null, false);						

	  	  			// reset the form text
							$("#submitCategoriesForm")[0].reset();
							// remove the error text
							$(".text-danger").remove();
							// remove the form error
							$('.form-group').removeClass('has-error').removeClass('has-success');
	  	  			
	  	  			$('#add-categories-messages').html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

	  	  			$(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert
						}  // if

					} // /success
				}); // /ajax	
			} // if

			return false;
		}); // submit categories form function
	}); // /on click on submit categories form modal	

}); // /document

// edit categories function
async function editCategories(categoriesId = null) {
    
    if (categoriesId) {
        // Remove the added categories id
        const editCategoriesId = document.getElementById('editCategoriesId');
        if (editCategoriesId) editCategoriesId.remove();

        // Reset the form
        const editCategoriesForm = document.getElementById('editCategoriesForm');
        if (editCategoriesForm) editCategoriesForm.reset();

        // Remove error messages and classes
        document.querySelectorAll('.text-danger').forEach(el => el.remove());
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('has-error', 'has-success');
        });

        // Hide modal content and show loading spinner
        document.querySelector('.modal-loading')?.classList.remove('div-hide');
        document.querySelector('.edit-categories-result')?.classList.add('div-hide');
        document.querySelector('.editCategoriesFooter')?.classList.add('div-hide');

        // Fetch category details
        try {
            const response = await fetch('php_action/fetchSelectedCategories.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `categoriesId=${categoriesId}`,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
			 // Populate form fields
                document.getElementById('editCategoriesName').value = data.category_name;
				document.getElementById('editCategoriesStatus').value = data.category_active == 1 ? 'available' : 'unavailable';
			 // Add hidden input for categories ID
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'editCategoriesId';
                hiddenInput.id = 'editCategoriesId';
                hiddenInput.value = data.category_id;
                document.querySelector('.editCategoriesFooter').after(hiddenInput);
			// Handle form submission
                editCategoriesForm.addEventListener('submit', function (e) {
                    e.preventDefault();
        // Clear previous errors
                    document.querySelectorAll('.text-danger').forEach(el => el.remove());
                    document.querySelectorAll('.form-group').forEach(el => {
                        el.classList.remove('has-error', 'has-success');
                    });
        // Validate form fields
                    const categoriesName = document.getElementById('editCategoriesName').value.trim();
                    const categoriesStatus = document.getElementById('editCategoriesStatus').value.trim();
                    let isValid = true;

                    if (!categoriesName) {
                        const errorMessage = document.createElement('p');
                        errorMessage.className = 'text-danger';
                        errorMessage.textContent = 'Category Name field is required';
                        document.getElementById('editCategoriesName').after(errorMessage);
                        document.getElementById('editCategoriesName').closest('.form-group').classList.add('has-error');
                        isValid = false;
                    } else {
                        document.getElementById('editCategoriesName').closest('.form-group').classList.add('has-success');
                    }
        if (!categoriesStatus) {
            //             const errorMessage = document.createElement('p');
                        errorMessage.className = 'text-danger';
                        errorMessage.textContent = 'Category Status field is required';
                        document.getElementById('editCategoriesStatus').after(errorMessage);
                        document.getElementById('editCategoriesStatus').closest('.form-group').classList.add('has-error');
                        isValid = false;
                    } else {
                        document.getElementById('editCategoriesStatus').closest('.form-group').classList.add('has-success');
                    }
            if (isValid) {
                        const formData = new FormData(editCategoriesForm);
                        const editCategoriesBtn = document.getElementById('editCategoriesBtn');
                        editCategoriesBtn.disabled = true;
                        editCategoriesBtn.textContent = 'Loading...';

                        fetch(editCategoriesForm.action, {
                            method: editCategoriesForm.method,
                            body: new URLSearchParams(formData),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        })
                            .then(response => response.json())
                            .then(response => {
                                editCategoriesBtn.disabled = false;
                                editCategoriesBtn.textContent = 'Submit';

                                if (response.success) {
                                    // Reload the table
                                    if (typeof manageCategoriesTable !== 'undefined') {
                                        manageCategoriesTable.ajax.reload(null, false);
                                    }

                                    // Show success message
                                    showAlert('edit-categories-messages', 'success', response.messages);
                                } else {
                                    // Show error message
                                    showAlert('edit-categories-messages', 'danger', response.messages);
                                }
                            })
                            .catch(error => {
                                editCategoriesBtn.disabled = false;
                                editCategoriesBtn.textContent = 'Submit';
                                showAlert('edit-categories-messages', 'danger', 'An error occurred while processing your request.');
                            });
						}
					})
            
        } catch (error) {
            console.error('Error fetching category details:', error);
            showAlert('edit-categories-messages', 'danger', 'Failed to fetch category details.');
        }
    } else {
        alert('Oops!! Refresh the page');
    }
}

// Helper function to display alerts
function showAlert(containerId, type, message) {
    const alertContainer = document.getElementById(containerId);
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ${message}
    `;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.style.display = 'none';
    }, 3500);
} // /edit categories function

// remove categories function
function removeCategories(categoriesId = null) {
		
	$.ajax({
		url: 'php_action/fetchSelectedCategories.php',
		type: 'post',
		data: {categoriesId: categoriesId},
		dataType: 'json',
		success:function(response) {			

			// remove categories btn clicked to remove the categories function
			$("#removeCategoriesBtn").unbind('click').bind('click', function() {
				// remove categories btn
				$("#removeCategoriesBtn").button('loading');

				$.ajax({
					url: 'php_action/removeCategories.php',
					type: 'post',
					data: {categoriesId: categoriesId},
					dataType: 'json',
					success:function(response) {
						if(response.success == true) {
 							// remove categories btn
							$("#removeCategoriesBtn").button('reset');
							// close the modal 
							$("#removeCategoriesModal").modal('hide');
							// update the manage categories table
							manageCategoriesTable.ajax.reload(null, false);
							// udpate the messages
							$('.remove-messages').html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

	  	  			$(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert
 						} else {
 							// close the modal 
							$("#removeCategoriesModal").modal('hide');

 							// udpate the messages
							$('.remove-messages').html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

	  	  			$(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert
 						} // /else
						
						
					} // /success function
				}); // /ajax function request server to remove the categories data
			}); // /remove categories btn clicked to remove the categories function

		} // /response
	}); // /ajax function to fetch the categories data
} // remove categories function