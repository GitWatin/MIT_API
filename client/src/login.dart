import 'dart:async';

import 'package:yaml/yaml.dart';
import "dart:io";
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:crypto/crypto.dart';

Future<String> login() async {
  File file_yaml = new File('./src/config/credentials.yml');

  if (!(await file_yaml.exists())) {
    print("Le fichier credentials.yml n'existe pas.");
    return "";
  }

  String yamlstring = file_yaml.readAsStringSync();
  Map yaml = loadYaml(yamlstring);

  print("Entrez le password");
  stdin.echoMode = false;
  var password = stdin.readLineSync();
  stdin.echoMode = true;

 

  var bytes = utf8.encode("m4sb0UlnMH" +
      password +
      "bpf9PltqY6"); // Salt est un string random pour renforcer le password
  var hashed = sha256.convert(bytes);
  var hashedStr = base64.encode(hashed.bytes);



  var url_tosend = 'http://mit.watin.be:8080/login';
  var response = await http.post(url_tosend,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': yaml['credentials']['email'],
        'password': hashedStr.toString() //utf8.decode(hashed.bytes)
      }));

  if (response.statusCode != 200) {
    Map res = jsonDecode(response.body);
    throw (res['msg']);
  }
  if (response.statusCode == 401) {
    print("BAD PASSWORD");
  }
  Map res = jsonDecode(response.body);
  //print(res['token']);
  return res['token'];
}

// String tokenGenerator() {
//   File file_yaml = new File('./src/config/credentials.yml');
//   String yamlstring = file_yaml.readAsStringSync();
//   Map yaml = loadYaml(yamlstring);

//   final now = DateTime.now();
//   final tomorrow = DateTime(now.year, now.month, now.day + 1);

//   String key = 'Test123*';
//   print('token');
//   print(key);
//   final claimToken = new JwtClaim(
//       otherClaims: <String, String>{
//         "name":
//             yaml['credentials']['nom'] + " " + yaml['credentials']['prenom'],
//         "email": yaml['credentials']['email']
//       },
//       issuer: 'MIT_CLIENT',
//       subject: 'Token To Authentify',
//       expiry: tomorrow,
//       issuedAt: DateTime.now());

//   String token = issueJwtHS256(claimToken, key);

//   //print(token);
//   return token;
// }
