import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

deleteuser(String token) async {
  print("Quel utilisateur voulez-vous supprimer ? (email)");
  var emailToDelete = stdin.readLineSync();

  var url_tosend = 'http://mit.watin.be:8080/student/' + emailToDelete;

  var response = await http.delete(
    url_tosend,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token,
    },
  );

  if (response.statusCode == 204) {
    print('Utilisateur supprimé');
  } else {
    Map res = jsonDecode(response.body);
    print(res['msg']);
  }
}
