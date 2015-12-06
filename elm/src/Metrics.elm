module Metrics where

import Html exposing (..)
import Html.Attributes exposing (id, class)
import Metric as Metric
import List exposing (map, filter)

-- Model

type Name = Work | Company | Team | Yourself | Manager
type alias Model = List (Name, Metric.Model)

model: Model
model = [ ( Work,     ( Metric.init (toString Work) "" ) )
        , ( Company,  ( Metric.init (toString Company) "" ) )
        , ( Team,     ( Metric.init (toString Team) "" ) )
        , ( Yourself, ( Metric.init (toString Yourself) "" ) )
        , ( Manager,  ( Metric.init (toString Manager) "" ) )
        ]

-- Update

type Action = Modify Name Metric.Action

update: Action -> Model -> Model
update action metrics =
  let updateMetric metricNameA metricAction (metricNameB, metricModel) =
        if metricNameA == metricNameB
        then ( metricNameA, ( Metric.update metricAction metricModel ) )
        else (metricNameB, metricModel)
  in
    case action of
      Modify metricName act -> map (updateMetric metricName act) metrics

-- View

view: Signal.Address Action -> Model -> Html
view address model =
  let
    modelToHtml = \(name, metric) ->
      (Metric.view (Signal.forwardTo address (Modify name) ) metric)
  in
    form
      [ id "metrics", class "form-inline" ]
      ( map modelToHtml model )
