module App.Meeting (
  model,
  view,
  update
  ) where

import Html exposing (Html, node)
import Html.Attributes as A
import Bootstrap.Html exposing (..)
import App.Metrics as Metrics
import App.Meeting.Note as Note

-- type alias Talker = String
-- type alias Listener = String
type alias Model = { metrics: Metrics.Model
  , note: Note.Note
  -- , talker: Talker
  -- , listener: Listener
}
model: Model
model = { metrics = Metrics.model
        , note = Note.init ""
-- , talker: Talker.model
-- , listener: Listener.model
        }

type Action = MetricsActions Metrics.Action | NoteActions Note.Action

-- View

view: Signal.Address Action -> Model -> Html
view address model =
  container_
    [ stylesheet "/vendor/bootstrap-3.3.6-dist/css/bootstrap.css"
    , stylesheet "/styles/style.css"
    , row_
      [ colMd_ 4 4 4 []
      , colMd_ 8 8 8
        [ Metrics.view (Signal.forwardTo address MetricsActions) model.metrics
        , Note.view (Signal.forwardTo address NoteActions) model.note
      ]
    ]
  ]

update: Action -> Model -> Model
update action model =
  case action of
    MetricsActions act ->
      { model | metrics = Metrics.update act Metrics.model }
    NoteActions act ->
      { model | note = Note.update act Note.model }

stylesheet : String -> Html
stylesheet href =
  node "link"
    [ A.rel "stylesheet"
    , A.href href
    ] []
