import 'dart:async';
import 'src/cli.dart';
import 'src/login.dart';

Future<int> main() async {
  String token = await login();
  var cli = Cli(token);
  return 0;
}
