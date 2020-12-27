import 'package:http/http.dart' as http;
import 'dart:convert' as convert;


  listuser() async
  {

    print("Listing user en cours");
    
    var url = 'http://mit.watin.be:8080/api/student/listuser/';
    var response = await http.get(url);

    if (response.statusCode == 200) {
    var jsonResponse = convert.jsonDecode(response.body);
    var itemCount = jsonResponse['totalItems'];
    print('Number of books about http: $itemCount.');
  } else {
    print('Request failed with status: ${response.statusCode}.');
  }
}

  
