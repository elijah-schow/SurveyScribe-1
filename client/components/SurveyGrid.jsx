import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import axios from 'axios';
import Layout from './Layout';

const styles = {
  card: {
    marginBottom: 10,
    marginTop: 10
  }
};

const SurveyTile = props => (
  <Col xs={12} sm={6} md={4}>
    <Card style={styles.card}>
      <CardTitle title={props.title} />
      <CardActions>
        <Link to="/edit"><FlatButton label="Edit" /></Link>
        <Link to="/results"><FlatButton label="Results" /></Link>
        <Link to="/answer"><FlatButton label="Share" /></Link>
      </CardActions>
    </Card>
  </Col>
);

SurveyTile.propTypes = {
  title: React.PropTypes.string.isRequired
};

const actions = [
  { label: 'Save', callback: () => {} },
  { label: 'Share', callback: () => {} },
  { label: 'Delete', callback: () => {} }
];

const handleClick = () => {
  axios.post('http://localhost:8080/api/surveys', {
    title: 'New Survey',
    questions: [
      {
        _id: '0',
        label: '',
        options: [
          {
            label: '',
            votes: 0
          }
        ]
      }
    ]
  },
    {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    throw error;
  });
};

const SurveyGrid = props => (
  <Layout title="Surveys" actions={actions}>
    <Grid>
      <Row>
        {props.surveys.map(survey => <SurveyTile key={survey.id} {...survey} />)}
      </Row>
    </Grid>
    <FloatingActionButton className="floatingActionButton" onClick={handleClick}>
      <ContentAdd />
    </FloatingActionButton>
  </Layout>
);

SurveyGrid.propTypes = {
  surveys: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    title: React.PropTypes.string.isRequired
  }))
};

SurveyGrid.defaultProps = {
  surveys: []
};

export default SurveyGrid;
