module App.Meeting.Note where

import Html exposing (textarea, Html)
import Html.Attributes as A

type alias Note = String

type alias Model = Note

model: Model
model = ""

init: String -> Model
init note = note

type Action = NoOp

update: Action -> Model -> Model
update action model =
  model

view: Signal.Address Action -> Model -> Html
view address model =
  textarea [ A.class "form-control" ] []
