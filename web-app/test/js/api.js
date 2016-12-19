/**
 * Created by Rafael on 19/12/2016.
 */

/**
 * AJAX
 */

NeuralComposer.saveFile = function(data) {
    var fileName = $('#textFieldSaveFilename').val();

    $.ajax({
        url: 'api/files.php',
        type: 'post',
        data: { 'data': data, 'name': fileName},
        success: function (data, textStatus, jqXHR) {
            NeuralComposer.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        statusCode: {
            404: function () {
                console.log('404');
            }
        }
    });
};

NeuralComposer.loadFile = function(path) {
    var truncated = (path.split('\\'));
    var fileName = truncated[truncated.length - 1];

    $.ajax({
        url: 'api/files.php',
        type: 'get',
        data: { 'load': fileName },
        success: function(data, textStatus, jqXHR) {
            if (NeuralComposer.checkIfDataValid(data)) NeuralComposer.trainingData = JSON.parse(data);
            NeuralComposer.log('Data successfully loaded!');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        statusCode: {
            404: function() {
                console.log('404');
            }
        }
    });
};
