import StartApp.Simple exposing (start)
import Html exposing (Html, node)
import App.Meeting exposing (model, view, update)

main : Signal Html
main =
    start { model = model, view = view, update = update }
