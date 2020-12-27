import 'package:http/http.dart' as http;
import 'dart:convert' as convert;


  listuser() async
  {

    print("Listing user en cours");
    
    var url = 'http://mit.watin.be:8080/student/listuser/';
    var response = await http.get(url);

    if (response.statusCode == 200) {
    var jsonResponse = convert.jsonDecode(response.body);

    print(jsonResponse);
    //var nom =jsonResponse.nom;
    //print(nom);
  } else {
    print('Request failed with status: ${response.statusCode}.');
  }
}

  
