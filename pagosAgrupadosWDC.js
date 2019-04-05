(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {       

        var cols = [
            { id: "pasarela", alias: "pasarela", dataType: tableau.dataTypeEnum.string },
            { id: "valor", alias: "valor", dataType: tableau.dataTypeEnum.string },
            { id: "cantidad", alias: "cantidad", dataType: tableau.dataTypeEnum.int }            
        ];

        var tableInfo = {
            id: "pagosAgrupados",
            alias: "Pagos Agrupados",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://backend.api.cdf.cl/api/v1/pagos/agrupados?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJhOGI4OWJhYy1iNDlkLTQzMDQtYTIzZS1hMTdiNjg5NGVmOTYiLCJ1c2VySWQiOiI1YzQxZTQwNjk2ZjRjNzdiZjBmMjk5MzkiLCJlbWFpbCI6ImF1dGhjcm1AY2RmLmNsIiwiZXN0YWRvIjp0cnVlLCJpYXQiOjE1NTQxMzI2OTksImV4cCI6MTU2MTkwODY5OX0.WHd6Pax8quwR_JtHRFyutWncg1HSK1mJrb4l88rpPtKyJNOZomZMKFM7-o6cglLDNvoxRMCMbigtU09DR-sWqkt8ihPxv8ia8AlvldtG3E7QcacA2ldOFkDwwEzHK6JKz0Nn1FjtMFlJlAL_KeL-zr7ugu9XcRq8zT_y_MuGkCCG2C7qBgRohcgYqdXi4Yguu2qDN3exUkoqkrb6w9pAES7319OsWwknSoiHB4SbPa8tjokDWsmzembqkN0ktIryWrCbXz9J-lhmwBoQbuzDBqyj4isGijqNxD29aBWr9Bw98K2BRlWd6ZPIbWJ7rtlyTNHxpoQ09C9CJNnf2DX0lA",function (data) {
            
            var pasarelas = Object.getOwnPropertyNames(data);            
            var tableData = [];

            pasarelas.forEach(function(pasarela){
                data[pasarela].forEach(function(obj){
                    tableData.push({
                        valor: obj.valor,
                        cantidad: obj.cantidad,
                        pasarela: pasarela
                    })
                });
            });

            table.appendRows(tableData);
            doneCallback();            
        });        
    };    

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Pagos Agrupados";
            tableau.submit();
        });
    });

})();
