var manageProductTable;


$(document).ready(function() {
	// top nav bar 
	$('#navProduct').addClass('active');
	// manage product data table
	manageProductTable = $('#manageProductTable').DataTable({
		'ajax': 'php_action/fetchProduct.php',
		'order': []
	});

	// add product modal btn clicked
	$("#addProductModalBtn").unbind('click').bind('click', function() {
		// // product form reset
		$("#submitProductForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		$("#productImage").fileinput({
	      overwriteInitial: true,
		    maxFileSize: 2500,
		    showClose: false,
		    showCaption: false,
		    browseLabel: '',
		    removeLabel: '',
		    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
		    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
		    removeTitle: 'Cancel or reset changes',
		    elErrorContainer: '#kv-avatar-errors-1',
		    msgErrorClass: 'alert alert-block alert-danger',
		    defaultPreviewContent: '<img src="assests/images/photo_default.png" alt="Profile Image" style="width:100%;">',
		    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
	  		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
			});   

		// submit product form
		$("#submitProductForm").unbind('submit').bind('submit', function() {

			// form validation
			var productImage = $("#productImage").val();
			var productName = $("#productName").val();
			var quantity = $("#quantity").val();
			var rate = $("#rate").val();
			var brandName = $("#brandName").val();
			var categoryName = $("#categoryName").val();
			var productStatus = $("#productStatus").val();
	
			if(productImage == "") {
				$("#productImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
				$('#productImage').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productImage").find('.text-danger').remove();
				// success out for form 
				$("#productImage").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productName == "") {
				$("#productName").after('<p class="text-danger">Product Name field is required</p>');
				$('#productName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productName").find('.text-danger').remove();
				// success out for form 
				$("#productName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(quantity == "") {
				$("#quantity").after('<p class="text-danger">Quantity field is required</p>');
				$('#quantity').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#quantity").find('.text-danger').remove();
				// success out for form 
				$("#quantity").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(rate == "") {
				$("#rate").after('<p class="text-danger">Rate field is required</p>');
				$('#rate').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#rate").find('.text-danger').remove();
				// success out for form 
				$("#rate").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(brandName == "") {
				$("#brandName").after('<p class="text-danger">Brand Name field is required</p>');
				$('#brandName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#brandName").find('.text-danger').remove();
				// success out for form 
				$("#brandName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(categoryName == "") {
				$("#categoryName").after('<p class="text-danger">Category Name field is required</p>');
				$('#categoryName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#categoryName").find('.text-danger').remove();
				// success out for form 
				$("#categoryName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productStatus == "") {
				$("#productStatus").after('<p class="text-danger">Product Status field is required</p>');
				$('#productStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productStatus").find('.text-danger').remove();
				// success out for form 
				$("#productStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productImage && productName && quantity && rate && brandName && categoryName && productStatus) {
				// submit loading button
				$("#createProductBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);

				$.ajax({
					url : form.attr('action'),
					type: form.attr('method'),
					data: formData,
					dataType: 'json',
					cache: false,
					contentType: false,
					processData: false,
					success:function(response) {

						if(response.success == true) {
							// submit loading button
							$("#createProductBtn").button('reset');
							
							$("#submitProductForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-product-messages').html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
		          '</div>');

							// remove the mesages
		          $(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          // reload the manage student table
							manageProductTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					} // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit product form

	}); // /add product modal btn clicked
	

	// remove product 	

}); // document.ready fucntion

// Helper function to show success messages
function showSuccessMessage(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="alert alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ${message}
            </div>
        `;

        // Remove the message after 3 seconds
        setTimeout(() => {
            const alert = container.querySelector('.alert-success');
            if (alert) {
                alert.remove();
				document.getElementsByClassName('btn btn-default')[6].click();
            }
        }, 3000);
		
    }
}// /edit product function

// Helper function to show error messages
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        const errorElement = document.createElement('p');
        errorElement.className = 'text-danger';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
        field.parentNode.classList.add('has-error');
    }
}//show error messages

// edit product
async function editProduct(productId = null) {
    if (productId) {
        // Remove existing productId input if it exists
        const existingProductIdInput = document.getElementById('editProductModalBtn');
        if (existingProductIdInput) {
            existingProductIdInput.remove();
        }

        // Remove all error messages
        document.querySelectorAll('.text-danger').forEach(el => el.remove());

        // Remove form-group error/success classes
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('has-error', 'has-success');
        });

        try {
            // Fetch product data via AJAX
            const response = await fetch('php_action/fetchSelectedProduct.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `productId=${productId}`, // Include productId in the request body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const productData = await response.json();

            
            // Update product image
            const productImageElement = document.getElementById('getProductImage');
            if (productImageElement) {
                productImageElement.src = `stock/${productData.product_image}`;
            }

            // Append hidden input for productId
            const editProductFooter = document.querySelector('.editProductFooter');
            const editProductPhotoFooter = document.querySelector('.editProductPhotoFooter');
            if (editProductFooter && editProductPhotoFooter) {
                editProductFooter.innerHTML += `<input type="hidden" name="productId" id="productId" value="${productData.product_id}" />`;
                editProductPhotoFooter.innerHTML += `<input type="hidden" name="productId" id="productId" value="${productData.product_id}" />`;
            }

            // Populate form fields
            document.getElementById('editProductName').value = productData.product_name;
            document.getElementById('editQuantity').value = productData.product_quantity;
            document.getElementById('editRate').value = productData.product_price;
            document.getElementById('editBrandName').value = productData.product_brand_id;
            document.getElementById('editCategoryName').value = productData.product_categories_id;
            document.getElementById('editProductStatus').value = productData.product_active;

            // Handle form submission for updating product data
            const editProductForm = document.getElementById('editProductForm');
            if (editProductForm) {
                editProductForm.onsubmit = async function (e) {
                    e.preventDefault();

                    // Validate form fields
                    const productName = document.getElementById('editProductName').value;
                    const quantity = document.getElementById('editQuantity').value;
                    const rate = document.getElementById('editRate').value;
                    const brandName = document.getElementById('editBrandName').value;
                    const categoryName = document.getElementById('editCategoryName').value;
                    const productStatus = document.getElementById('editProductStatus').value;

                    let isValid = true;

                    if (!productName) {
                        showError('editProductName', 'Product Name field is required');
                        isValid = false;
                    }
                    if (!quantity) {
                        showError('editQuantity', 'Quantity field is required');
                        isValid = false;
                    }
                    if (!rate) {
                        showError('editRate', 'Rate field is required');
                        isValid = false;
                    }
                    if (!brandName) {
                        showError('editBrandName', 'Brand Name field is required');
                        isValid = false;
                    }
                    if (!categoryName) {
                        showError('editCategoryName', 'Category Name field is required');
                        isValid = false;
                    }
                    if (!productStatus) {
                        showError('editProductStatus', 'Product Status field is required');
                        isValid = false;
                    }

                    if (isValid) {
                        const formData = new FormData(editProductForm);
						formData.append('productId', productId);
                        try {
                            const updateResponse = await fetch(editProductForm.action, {
                                method: editProductForm.method,
                                body: formData,
                            });
                            const updateResult = await updateResponse.json();

                            if (updateResult.success) {
                                showSuccessMessage('edit-product-messages', updateResult.messages);
								// Reload product table
                                if (typeof manageProductTable !== 'undefined') {
                                    manageProductTable.ajax.reload(null, true);
                                }
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                };
            }

            // Handle form submission for updating product image
            const updateProductImageForm = document.getElementById('updateProductImageForm');
            if (updateProductImageForm) {
                updateProductImageForm.onsubmit = async function (e) {
                    e.preventDefault();

                    const productImage = document.getElementById('editProductImage').value;

                    if (!productImage) {
                        showError('editProductImage', 'Product Image field is required');
                    } else {
                        const formData = new FormData(updateProductImageForm);

                        try {
                            const updateResponse = await fetch(updateProductImageForm.action, {
                                method: updateProductImageForm.method,
                                body: formData,
                            });
                            const updateResult = await updateResponse.json();

                            if (updateResult.success) {
                                showSuccessMessage('edit-productPhoto-messages', updateResult.messages);
                                // Reload product table
                                if (typeof manageProductTable !== 'undefined') {
                                    manageProductTable.ajax.reload(null, true);
                                }

                                // Refresh product image
                                const imageResponse = await fetch(`php_action/fetchProductImageUrl.php?i=${productId}`);
                                const imageUrl = await imageResponse.text();
                                const productImageElement = document.getElementById('getProductImage');
                                if (productImageElement) {
                                    productImageElement.src = imageUrl;
                                }
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                };
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Please refresh the page. ');
        }
    } else {
        alert('Error: Please refresh the page. Product Id could not be found');
    }
}//edit product function

// remove product 
async function removeProduct(productId = null) {
	if (productId) {

		// Remove product button clicked
		const removeProductBtn = document.getElementById('removeProductBtn');
		removeProductBtn.removeEventListener('click', handleRemoveClick); // Remove existing listener to avoid duplicates
		removeProductBtn.addEventListener('click', handleRemoveClick);

		async function handleRemoveClick() {
			// Loading remove button
			removeProductBtn.disabled = true;
			removeProductBtn.textContent = 'Removing...';

			try {
				// AJAX request to remove product
				const response = await fetch('php_action/removeProduct.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `productId=${productId}`
				});

				const data = await response.json();

				// Reset remove button
				removeProductBtn.disabled = false;
				removeProductBtn.textContent = 'Remove Product';

				if (data.success) {
					// Hide the remove product modal
					const removeProductModal = document.getElementById('removeProductModal');
					removeProductModal.style.display = 'none';
					

					// Update the product table (assuming `manageProductTable` is a DataTables instance)
					if (manageProductTable && typeof manageProductTable.ajax.reload === 'function') {
						manageProductTable.ajax.reload(null, false);
					}

					// Show success message
					const removeMessages = document.querySelector('.remove-messages');
					removeMessages.innerHTML = `
						<div class="alert alert-success">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
							<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> ${data.messages}
						</div>
					`;

					// Remove the success message after 3.5 seconds
					setTimeout(() => {
						const alert = removeMessages.querySelector('.alert-success');
						if (alert) {
							alert.remove();
						}
					}, 3500);

						var modalBackdrop = document.querySelector('.modal-backdrop')
						if (!modalBackdrop) {
							console.log('Could not find modal backdrop');
						}else{
							document.querySelector('.modal-backdrop').className = ""
							document.querySelector('body').className = ""
							document.querySelector('.body').paddingRight = "0px"
						}
				} else {
					// Show error message
					const removeProductMessages = document.querySelector('.removeProductMessages');
					removeProductMessages.innerHTML = `
						<div class="alert alert-danger">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
							<strong><i class="glyphicon glyphicon-remove-sign"></i></strong> ${data.messages}
						</div>
					`;

					// Remove the error message after 3.5 seconds
					setTimeout(() => {
						const alert = removeProductMessages.querySelector('.alert-danger');
						if (alert) {
							alert.remove();
						}
					}, 3500);
				}
			} catch (error) {
				console.error('Error:', error);
				// Reset remove button in case of error
				removeProductBtn.disabled = false;
				removeProductBtn.textContent = 'Remove Product';
			}

			return false; // Prevent default form submission
		}
	}
}
//remove product function

// function clearForm(oForm) {
// 	// var frm_elements = oForm.elements;									
// 	// console.log(frm_elements);
// 	// 	for(i=0;i<frm_elements.length;i++) {
// 	// 		field_type = frm_elements[i].type.toLowerCase();									
// 	// 		switch (field_type) {
// 	// 	    case "text":
// 	// 	    case "password":
// 	// 	    case "textarea":
// 	// 	    case "hidden":
// 	// 	    case "select-one":	    
// 	// 	      frm_elements[i].value = "";
// 	// 	      break;
// 	// 	    case "radio":
// 	// 	    case "checkbox":	    
// 	// 	      if (frm_elements[i].checked)
// 	// 	      {
// 	// 	          frm_elements[i].checked = false;
// 	// 	      }
// 	// 	      break;
// 	// 	    case "file": 
// 	// 	    	if(frm_elements[i].options) {
// 	// 	    		frm_elements[i].options= false;
// 	// 	    	}
// 	// 	    default:
// 	// 	        break;
// 	//     } // /switch
// 	// 	} // for
// }

