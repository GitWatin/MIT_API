import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

listuser(String token) async {
  print("Listing user en cours");

  var url_tosend = 'http://mit.watin.be:8080/student/';
  var response = await http.get(url_tosend, headers: <String, String>{
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + token,
  });

  if (response.statusCode == 200) {
    var jsonResponse = jsonDecode(response.body);
    print(jsonResponse);
  } else {
    Map res = jsonDecode(response.body);
    print(res['msg']);
  }
}
