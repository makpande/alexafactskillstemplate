/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Meditation Geek for a meditation fact"
 *  Alexa: "Here are your facts on  meditation: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing meditation facts.
 */
var MEDITATION_FACTS = [
    "Meditation is generally considered to be safe for healthy people.",
    "However, people with physical limitations may not be able to participate in certain meditative practices involving movement.",
    "Meditation is helpful for a variety of conditions such as high blood pressure certain psychological disorders and pain.",
    "Evidence about its effectiveness for pain and as a smoking-cessation treatment is uncertain.",
    "Meditation reduces symptoms of irritable bowel syndrome, anxiety and depression, insomnia, and the incidence, duration, and severity of acute respiratory illnesses (such as influenza).",
    "Meditation is a mind and body practice that has a long history of use for increasing calmness and physical relaxation.",
    "It helps in improving psychological balance, coping with illness, and enhancing overall health and well-being.",
    "Mind and body practices focus on the interactions among the brain, mind, body, and behavior.",
    "There are many types of meditation, but most have four elements in common: a quiet location with as few distractions as possible; a specific, comfortable posture (sitting, lying down, walking, or in other positions); a focus of attention (a specially chosen word or set of words, an object, or the sensations of the breath); and an open attitude (letting distractions come and go naturally without judging them).",
    "Some research suggests that meditation may physically change the brain and body, and could potentially help to improve many health problems and promote healthy behaviors.",
    "There have been rare reports that meditation could cause or worsen symptoms in people with certain psychiatric problems like anxiety and depression.",
    "People with existing mental health conditions should speak with their health care providers before starting a meditative practice, and make their meditation instructor aware of their condition.",
    "Don’t use meditation to replace conventional care or as a reason to postpone seeing a health care provider about a medical problem.",
    "Ask about the training and experience of the meditation instructor you are considering.",
    "Help your health care providers give you better coordinated and safe care by telling them about all the health approaches you use.",
    "Give your health care providers a full picture of what you do to manage your health."
  ];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MeditationGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var MeditationGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MeditationGeek.prototype = Object.create(AlexaSkill.prototype);
MeditationGeek.prototype.constructor = MeditationGeek;

MeditationGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MeditationGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

MeditationGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MeditationGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
MeditationGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MeditationGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

MeditationGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Meditation Geek tell me a fact on Meditation, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random facts on meditation from the meditation facts list
    var factIndex = Math.floor(Math.random() * MEDITATION_FACTS.length);
    var fact = MEDITATION_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here are your facts on meditation: " + fact;

    response.tellWithCard(speechOutput, "MeditationGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MeditationGeek skill.
    var meditationGeek = new MeditationGeek();
    meditationGeek.execute(event, context);
};
