import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import ActionButton from "./components/Actionbutton/ActionButton";
import EditActionButton from "./components/Actionbutton/EditActionButton";
import CelebrityContainer from "./components/CelebrityContainer/CelebrityContainer";
import CelebrityInfoOne from "./components/CelebrityInfo/CelebrityInfoOne/CelebrityInfoOne";
import CelebrityInfoTwo from "./components/CelebrityInfo/CelebrityInfoTwo/CelebrityInfoTwo";
import Form from "./components/Form/Form";
import ModalBox from "./components/Modal";

interface Celebrity {
  id: number;
  first: string;
  last: string;
  picture: string;
  dob: string;
  gender: string;
  country: string;
  description: string;
}

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [celebrityList, setCelebrityList] = useState<Celebrity[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<Celebrity[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [editedCelebrity, setEditedCelebrity] = useState<Celebrity | null>(
    null
  );

  useEffect(() => {
    fetch("./celebrities.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCelebrityList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedSearch = search.trim().toLowerCase();
      const matchingCelebrities = celebrityList.filter(
        (celebrity) =>
          celebrity.first.toLowerCase().includes(trimmedSearch) ||
          celebrity.last.toLowerCase().includes(trimmedSearch)
      );
      console.log(matchingCelebrities);
      setSearchResults(matchingCelebrities);
      setShowDetails(true);
      setSearch("");
    },
    [search, celebrityList]
  );

  const handleDelete = useCallback((id: number) => {
    const updatedList = celebrityList.filter(
      (celebrity) => celebrity.id !== id
    );
    console.log("Updated List is: ", updatedList);
    setCelebrityList((prevResults) => {
      const updatedList = prevResults.filter(
        (celebrity) => celebrity.id !== id
      );
      console.log(updatedList);
      return updatedList;
    });

    // Now updating the search results to reflect the removal
    setSearchResults((prevResults) => {
      const updatedSearchResult = prevResults.filter(
        (celebrity) => celebrity.id !== id
      );
      return updatedSearchResult;
    });
    setOpen(false);
  }, []);

  const handleEdit = (celebrity: Celebrity) => {
    console.log("Thed editable celebrity is: ", celebrity);
    if (celebrity) setEditable(true);
    setEditedCelebrity({ ...celebrity });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files && event.target.files[0]) {
      const updatedCelebrity = {
        ...editedCelebrity,
        picture: URL.createObjectURL(event.target.files[0]),
      } as Celebrity;
      setEditedCelebrity(updatedCelebrity);
    }
  };

  // when user enter something that changes by this logic
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    id: number
  ) => {
    const { name, value } = e.target;

    if (editedCelebrity) {
      const updatedCelebrity = {
        ...editedCelebrity,
        [name]: value,
      } as Celebrity;

      setEditedCelebrity(updatedCelebrity);
    }
  };

  // Save the details of celebrity After editing
  const handleSave = useCallback(() => {
    if (editedCelebrity) {
      // setSearchResults(updatedList);
      setCelebrityList((prevResult) => {
        const updatedList = prevResult.map((celebrity) =>
          celebrity.id === editedCelebrity.id
            ? { ...celebrity, ...editedCelebrity }
            : celebrity
        );
        return updatedList;
      });
      setEditable(false);
      setEditedCelebrity(null);
    }
  }, [editedCelebrity]);

  const handleCancel = () => {
    setEditable(false);
    setEditedCelebrity(null);
  };

  const handleArrow = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleGenderChange = (gender: string, id: number) => {
    if (editedCelebrity) {
      const updatedCelebrity = { ...editedCelebrity, gender } as Celebrity;
      setEditedCelebrity(updatedCelebrity);
    }
  };

  return (
    <div>
      {/* Search Field  */}
      <Form
        search={search}
        onSubmit={handleSubmit}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {showDetails &&
        searchResults.map((celebrity) => (
          <div className="celebrity-container" key={celebrity.id}>
            {/* handle Image and name Component  */}
            <CelebrityContainer
              editable={editable && editedCelebrity?.id === celebrity.id}
              onImageChange={(e) => onImageChange(e, celebrity.id)}
              celebrityDetails={
                editable && editedCelebrity?.id === celebrity.id
                  ? editedCelebrity
                  : celebrity
              }
              handleInputChange={(e) => handleInputChange(e, celebrity.id)}
              handleArrow={() => handleArrow(celebrity.id)}
              collapse={expandedId === celebrity.id}
            />

            {expandedId === celebrity.id && (
              <div className="celebrity-info">
                {/* handle Age, gender and country Component  */}
                <CelebrityInfoOne
                  editable={editable && editedCelebrity?.id === celebrity.id}
                  celebrityDetails={
                    editable && editedCelebrity?.id === celebrity.id
                      ? editedCelebrity
                      : celebrity
                  }
                  handleInputChange={(e) => handleInputChange(e, celebrity.id)}
                  handleGenderChange={(gender) =>
                    handleGenderChange(gender, celebrity.id)
                  }
                />

                {/* Handle Description  part in this component  */}
                <CelebrityInfoTwo
                  editable={editable && editedCelebrity?.id === celebrity.id}
                  celebrityDetails={
                    editable && editedCelebrity?.id === celebrity.id
                      ? editedCelebrity
                      : celebrity
                  }
                  handleInputChange={(e) => handleInputChange(e, celebrity.id)}
                />
                <div className="action-buttons">
                  {editable && editedCelebrity?.id === celebrity.id ? (
                    <ActionButton
                      handleCancel={handleCancel}
                      handleSave={handleSave}
                    />
                  ) : (
                    <EditActionButton
                      handleEdit={() => handleEdit(celebrity)}
                      celebrity={celebrity}
                      handleOpen={handleOpen}
                    />
                  )}
                </div>
                <ModalBox
                  open={open}
                  onClose={handleClose}
                  handleClose={handleClose}
                  handleDelete={() => {
                    handleDelete(celebrity.id);
                  }}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default App;
