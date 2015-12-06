module Note where

import Html exposing (textarea, Html)
import Html.Attributes as A

type alias Note = String

type alias Model = Note

init: String -> Model
init note = note

type Action = NoOp

view: Signal.Address Action -> Model -> Html
view address model =
  textarea [ A.class "form-control" ] []
