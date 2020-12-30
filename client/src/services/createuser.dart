//import 'dart:html';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

createuser(String token) async {
  print("Création d'une utilisateur");
  print("Entrez le NOM");
  var nom = stdin.readLineSync();

  print("Entrez le PRÉNOM");
  var prenom = stdin.readLineSync();

  //print("Entrez le Status (1=Student;0=prof");
  //var status = stdin.readLineSync();

  print("Entrez l'adresse email");
  var email = stdin.readLineSync();

  print("Entrez le password");
  var password = stdin.readLineSync();

  var url_tosend = 'http://mit.watin.be:8080/student/';

  var response = await http.post(url_tosend,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + token,
      },
      body: jsonEncode(<String, String>{
        'lastname': nom,
        'firstname': prenom,
        'email': email,
        'password': password
      }));

  if (response.statusCode == 201) {
    print('Utilisateur crée');
  } else {
    Map res = jsonDecode(response.body);
    print(res['msg']);
  }
}
