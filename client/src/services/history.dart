import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

showHistory(String token) async {
  print("Historique des 10 dernières compilations");

  var url_tosend = 'http://mit.watin.be:8080/compile/';
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
