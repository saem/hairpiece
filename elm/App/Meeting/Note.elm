module App.Meeting.Note (
  model,
  init,
  update,
  view
  ) where

import Html exposing (textarea, Html)
import Html.Attributes as A

type alias Note = List Media
type alias Media = { version: Version, content: Content }

type alias Version = { major: Int, minor: Int }
type alias Url = String
type Content = Markdown String | Youtube Url

type alias Model = Note

model: Model
model = []

init: String -> Model
init note = [ (media (Markdown note)) ]

type Action = NoOp

update: Action -> Model -> Model
update action model =
  model

view: Signal.Address Action -> Model -> Html
view address model =
  textarea [ A.class "form-control" ] []

media: Content -> Media
media content =
  case content of
    Markdown body -> { version = (createVersion 1 0)
                     , content = (Markdown body) }
    Youtube body -> { version = (createVersion 1 0)
                    , content = (Youtube body) }

createVersion: Int -> Int -> Version
createVersion major minor =
  { major = major, minor = minor }
