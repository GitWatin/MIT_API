import 'package:jaguar_jwt/jaguar_jwt.dart';
import 'package:yaml/yaml.dart';
import "dart:io";

login() {}

String tokenGenerator() {
  File file_yaml = new File('./src/config/credentials.yml');
  String yamlstring = file_yaml.readAsStringSync();
  Map yaml = loadYaml(yamlstring);

  final now = DateTime.now();
  final tomorrow = DateTime(now.year, now.month, now.day + 1);

  String key = 'Test123*';
  print('token');
  print(key);
  final claimToken = new JwtClaim(
      otherClaims: <String, String>{
        "name":
            yaml['credentials']['nom'] + " " + yaml['credentials']['prenom'],
        "email": yaml['credentials']['email']
      },
      issuer: 'MIT_CLIENT',
      subject: 'Token To Authentify',
      expiry: tomorrow,
      issuedAt: DateTime.now());

  String token = issueJwtHS256(claimToken, key);

  //print(token);
  return token;
}
