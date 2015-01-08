'use strict';

app.factory('serviceFunctions', function ($resource, baseUrl, $q) {

    function pageNumbersArray(data) {
        var pageArray = [];
        for (var i = 0; i < data.numPages; i++) {
            pageArray[i] = i + 1;
        }

        return pageArray;
    }

    function convertImageToBase64(inputTypeFileElement, containingImageDataObject) {
        var deferred = $q.defer();
        var photofile = inputTypeFileElement.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var pattern = /^data:image\/.*$/;
            if (pattern.test(e.target.result)) {
                containingImageDataObject.imageDataUrl = e.target.result;
                containingImageDataObject.ChangeImage = true;
                deferred.resolve(containingImageDataObject);
            } else {
                deferred.reject('Invalid image file type');
            }
        };
        reader.readAsDataURL(photofile);

        return deferred.promise;

    }

    function messageServerErrors(msg, serverError) {
        // Collect errors to display from the server response
        var errors = [];
        if (serverError && serverError.error_description) {
            errors.push(serverError.error_description);
        }
        if (serverError && serverError.modelState) {
            var modelStateErrors = serverError.modelState;
            for (var propertyName in modelStateErrors) {
                var errorMessages = modelStateErrors[propertyName];
                var trimmedName =
                    propertyName.substr(propertyName.indexOf('.') + 1);
                for (var i = 0; i < errorMessages.length; i++) {
                    var currentError = errorMessages[i];
                    errors.push(trimmedName + ' - ' + currentError);
                }
            }
        }
        if (errors.length > 0) {
            msg = msg + ":<br>" + errors.join("<br>");
        }
        return msg;
    }
    return {
        pageNumbersArray: pageNumbersArray,
        convertImageToBase64: convertImageToBase64,
        messageServerErrors: messageServerErrors
    };
});