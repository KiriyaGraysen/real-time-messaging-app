function UserProfile(props) {
  return (
    <div className="profile-card">
      <h2>{props.name}</h2>
      <p>{props.job}</p>
    </div>
  );
}

export default UserProfile;
