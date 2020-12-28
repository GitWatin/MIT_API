//import 'dart:html';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';


createuser() async
{
    print("Création d'une utilisateur");
    print("Entrez le NOM");
    var nom = stdin.readLineSync(); 

    print("Entrez le PRÉNOM");
    var prenom = stdin.readLineSync(); 

    print("Entrez le Status (1=Student;0=prof");
    var status = stdin.readLineSync(); 


    Map data =
    {
      'nom': nom,
      'prenom': prenom,
      'status' : status
    };

    String body = json.encode(data);

    var url_tosend = 'http://mit.watin.be:8080/student/';

    var response = await http.post(
      url_tosend,
      headers: {"Content-Type": "application/json"},
      body: body,
      );
    print(body);
    if (response.statusCode == 200) 
    {
      print('Coucou c moi');
    }
}