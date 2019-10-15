var list = [
    {'desc':'rice',
     'amount':'1',
     'value':'5.40'  
    },
    {'desc':'beer',
     'amount':'12',
     'value':'1.99'  
    },
    {'desc':'veg',
     'amount':'1',
     'value':'2'  
    }
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total+= list[key].value * list[key].amount;
    }
    return total;
}

function setList(list){
    var table = '<thead>'+
                '<tr>'+
                '    <td>Description</td>'+
                '    <td>Amount</td>'+
                '    <td>Value</td>'+
                '    <td>Action</td>'+
                '</tr>'+
                '</thead>'+
                '<tbody>';
    
                for(var key in list){
                    table += '<tr>'+
                                '<td>'+ formatDesc(list[key].desc)   +'</td>'+
                                '<td>'+ list[key].amount             +'</td>'+
                                '<td>'+ formatValue(list[key].value )+'</td>'+
                                '<td>'+ 
                                    '<button class="btn btn-default" onclick="setUpdate('+ key +');">Edit</button>'  + 
                                    '<button class="btn btn-danger" onclick="deleteData('+ key +');">Delete</button>'+
                                '</td>'+
                            '</tr>';
                            
                }

                table += '</tbody>';
                document.getElementById('list-table').innerHTML = table;

}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase()+str.slice(1);//Primeiro caractere da string
    return str;
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + '';
    str = str.replace('.',',');
    str = '$ ' + str;
    return str;
}

function addData(){
    var desc = document.getElementById('desc').value;
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('val').value;

    list.unshift({'desc':desc, 'amount':amount, 'value':value});

    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("val").value = obj.value;
    document.getElementById('btn-update').style.display = 'inline-block';
    document.getElementById('btn-add').style.display = 'none';

    document.getElementById('input-id-update').innerHTML = '<input id="id-update" type="hidden" value="'+ id +'">';

}

function resetForm(){
    document.getElementById("desc").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("val").value = '';
    document.getElementById('btn-add').style.display = 'inline-block';
    document.getElementById('btn-update').style.display = 'none';

    document.getElementById('input-id-update').innerHTML = '';

}

function updateData(){
    var id = document.getElementById('id-update').value;
    var desc = document.getElementById('desc').value;
    var amount  = document.getElementById('amount').value;
    var value = document.getElementById('val').value;

    list[id] = {'desc': desc, 'amount': amount, 'value':value};

    resetForm();
    setList(list);
}
function deleteData(id){
    if(confirm('Delete this item?')){
        if(id === list.length - 1){
            list.pop();
        } else if(id === 0){
            list.shift();
        } else {
            var arr_aux_ini = list.slice(0,id);
            var arr_aux_end = list.slice(id+1);
            list = arr_aux_ini.concat(arr_aux_end);
        }
        setList(list);
    } else {

    }
}

setList(list);
console.log(getTotal(list));