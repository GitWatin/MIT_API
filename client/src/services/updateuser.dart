import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

updateuser(String token) async {
  print("Quel utilisateur voulez-vous modifier ? (email)");
  var emailToModify = stdin.readLineSync();

  print("Entrez le NOM");
  var nom = stdin.readLineSync();

  print("Entrez le PRÉNOM");
  var prenom = stdin.readLineSync();

  print("Entrez l'adresse email");
  var email = stdin.readLineSync();

  var url_tosend = 'http://mit.watin.be:8080/student/' + emailToModify;

  var response = await http.put(url_tosend,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + token,
      },
      body: jsonEncode(<String, String>{
        'lastname': nom,
        'firstname': prenom,
        'email': email
      }));

  if (response.statusCode == 204) {
    print('Utilisateur modifié');
  } else {
    Map res = jsonDecode(response.body);
    print(res['msg']);
  }
}
