import 'dart:io';
import 'package:http/http.dart' as http;
import 'services/createuser.dart';
import 'services/history.dart';
import 'services/listuser.dart';
import 'services/updateuser.dart';
import 'services/deletuser.dart';
import 'services/compile_gcc.dart';

Cli(String token) {
  print(token);

  help();
  print("Veuillez saisir l'opération");
  var choice = stdin.readLineSync();

  switch (choice) {
    case "createuser":
      {
        createuser(token);
      }
      break;

    case "listuser":
      {
        listuser(token);
      }
      break;

    case "alteruser":
      {
        updateuser(token);
      }
      break;

    case "deleteuser":
      {
        deleteuser(token);
      }
      break;
    case "compile":
      {
        compile(token);
      }
      break;
    case "showhistory":
      {
        showHistory(token);
      }
      break;
    case "help":
      {
        help();
      }
      break;

    default:
      {
        print("Invalid choice");
      }
      break;
  }
}

help() {
  print("Available commands:");
  print("   help        - display help");
  print("   createuser  - create user");
  print("   deleteuser  - delete existing user");
  print("   alteruser   - alter existing user");
  print("   listuser - list existing users");
  print("   compile - list existing users");
  print("   showhistory - list existing users");
  print("   exit        - exit the application");
}
