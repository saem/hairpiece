module App.Metrics.Metric where

import Html exposing (..)
import Html.Events as HtmlEvent
import Html.Attributes exposing (value, for, id, class)
import Bootstrap.Html exposing (..)
import String exposing (toLower, concat)
import Json.Decode as Json

-- Model

type Metric = Better | Same | Worse

stringToMetric: String -> Maybe Metric
stringToMetric string =
  case toLower string of
    "better" -> Just Better
    "same"   -> Just Same
    "worse"  -> Just Worse
    _        -> Nothing

type alias Model = { name: String, metric: Maybe Metric }

model : Model
model = { name = "", metric = Nothing }

init: String -> String -> Model
init name value =
  case stringToMetric value of
    Just metric -> { model | name = name, metric = Just metric }
    _        -> { model | name = name, metric = Nothing }

-- Update

type Action = NoOp | Modify Metric

stringToAction: String -> Action
stringToAction string =
  case (stringToMetric string) of
    Just metric -> Modify metric
    Nothing     -> NoOp

update: Action -> Model -> Model
update action model =
  case action of
    Modify value -> { model | metric = Just value }
    _            -> model

-- View

selectedValue: Json.Decoder String
selectedValue = Json.at ["target", "value"] Json.string

view: Signal.Address Action -> Model -> Html
view address model =
  let selectMetric = HtmlEvent.on "change" selectedValue
                    (Signal.message address << stringToAction)
      idString     = concat [ "metric-select-", toLower model.name ]
  in
    formGroup_
      [
        label
          [ for idString ]
          [ text model.name ]
      , select
          [ id idString, selectMetric, class "form-control" ]
          [ option [ value "" ]       [text "Unanswered"]
          , option [ value "bEtter" ] [text "Better"]
          , option [ value "samE" ]   [text "Same"]
          , option [ value "worsE" ]  [text "Worse"]
          ]
      ]
