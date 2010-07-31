solution = "MongoDbNotes.sln"
configuration = "release"

target default, (compile):
  pass

desc "Compiles the solution"
target compile:
  msbuild(solution, {@configuration: configuration})
