import Html exposing (Html, node)
import Html.Attributes as A
import Bootstrap.Html exposing (..)
import StartApp.Simple exposing (start)
import Metrics as Metrics
import Note as Note

-- View

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

type SubAction = MetricsActions Metrics.Action | NoteActions Note.Action
type Action = Modify SubAction

view: Signal.Address Action -> Metrics.Model -> Html
view address model =
  container_ [
    stylesheet "/vendor/bootstrap-3.3.6-dist/css/bootstrap.css",
    stylesheet "styles/style.css",
    row_ [ colMd_ 4 4 4 [],
      colMd_ 8 8 8 [
        Metrics.view (address Signal.forwardTo MetricsActions) model
        Note.view (address Signal.forwardTo NoteActions) model
      ]
    ]
  ]

update: Action -> Model -> Model
update action model =
  case action of
    Modify MetricsActions act ->
      Metrics.update act Metric.model
    Modify NoteActions act ->
      Note.update act Note.model

stylesheet : String -> Html
stylesheet href =
  node "link"
    [ A.rel "stylesheet"
    , A.href href
    ] []

main : Signal Html
main =
    start { model = model, view = view, update = update }
