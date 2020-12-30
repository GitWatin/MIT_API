import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';
import 'package:yaml/yaml.dart';

compile(String token) async {
  print('Le fichier sera compilé en fonction de son extension');

  // Lecture du yaml contentant le path
  File file_yaml = new File('./src/config/credentials.yml');

  if (!(await file_yaml.exists())) {
    throw ("Le fichier credentials.yml n'existe pas.");
  }
  String yamlstring = file_yaml.readAsStringSync();
  Map yaml = loadYaml(yamlstring); // Load yaml

  // Lecture du fichier a compiler

  File fileToCompile = new File(yaml['PathToCompile']['path']);

  if (!(await fileToCompile.exists())) {
    print("Le fichier donné n'existe pas.");
    return;
  }

  String fileToCompileString = fileToCompile.readAsStringSync();
  var fileName = (yaml['PathToCompile']['path'].split('/').last);

  print(fileName);

  var url_tosend = 'http://mit.watin.be:8080/compile/' + fileName;

  var response = await http.post(url_tosend,
      headers: <String, String>{
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + token,
      },
      body: fileToCompileString);

  if (response.statusCode != 200) {
    Map res = jsonDecode(response.body);
    print(res['msg']);
    throw (res['msg']);
  }

  print(response.body);
  return response.body;
}
