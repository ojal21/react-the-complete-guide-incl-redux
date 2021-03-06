import React, {PureComponent} from 'react';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person/Person";

class Persons extends PureComponent {

    constructor(props) {
        super(props);
        console.log('inside Persons constructor', props);
    }

    componentWillMount() {
        console.log('inside Persons componentWillMount');
    }

    componentDidMount() {
        console.log('inside Persons componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE]inside Persons componentWillReceiveProps', nextProps);
    }

   /* shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE]inside Persons shouldComponentUpdate', nextProps);
        return nextProps.persons !== this.props.persons ||
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked;
    }
*/
    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE]inside Persons componentWillUpdate', nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('[UPDATE]inside Persons componentDidUpdate', prevProps);
    }


    render() {
        console.log('inside Persons render');
        return this.props.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
                <Person
                    clicked={() => this.props.clicked(index)}
                    name={person.name}
                    position={index}
                    age={person.age}
                    changed={(event) => this.props.changed(event, person.id)}/>
            </ErrorBoundary>
        });
    }
}

export default Persons;