import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  View
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      loading: true,
      loadingMore: false,
      error: null
    };
  }

  componentDidMount() {
    const apiUrl =
      'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({data: resJson, loadingMore: true});
      });
  }
  handleLoadMore = async () => {
    if (this.state.page === 4) {
      this.setState({loadingMore: false});
    }
    await this.setState({page: this.state.page + 1, isLoading: true});
    const apiUrl = `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${this.state.page}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          data: [...this.state.data, ...resJson],
          isLoading: false
        });
      });
  };

  renderView = ({item}) => {
    return (
      <ImageBackground
        source={{uri: item.thumbnailUrl}}
        style={{
          paddingBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
          width: 400,
          backgroundColor: 'green',
          borderWidth: 1
        }}>
        <Text>{item.title}</Text>
      </ImageBackground>
    );
  };

  footerList = () => {
    return (
      <View
        style={{
          position: 'relative',
          width: 100,
          height: 100,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: 'black'
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={this.renderView}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.footerList}
        />
      </View>
    );
  }
}

export default App;
